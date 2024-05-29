const Gi = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)

const genAI = new Gi.GoogleGenerativeAI("AIzaSyBFtiANejQr0W24ORm01d72JCzr1LFUXyA");

async function getMotion(roomStr, ioObject) {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "give a random debate Topic to argue on from wide domain and currrent affairs ONLY GIVE TOPIC DO NOT PROVIDE ANYTHING ELSE GIVE DIFFERENT TOPIC EACH TIME"

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    ioObject.to(roomStr).emit("recv_motion", text);
}

class Conversation {

    constructor(user1, user2, roomStrArr, ioObject) {
        this.ioObject = ioObject;
        this.userPair = [user1, user2];
        this.createRoom(roomStrArr)
    }

    createRoom(arrayRooms) {
        this.roomStr = arrayRooms.length;

        this.userPair[0].socket.join(this.roomStr);
        this.userPair[1].socket.join(this.roomStr);

        console.log(`Users ${this.userPair[0].username} and ${this.userPair[1].username} Joined on roomstr = ${this.roomStr}`);

        this.ioObject.to(this.roomStr).emit("get_room", this.roomStr);
        getMotion(this.roomStr, this.ioObject);

        this.addHandlers();
    }
    getRoomStr() {
        return this.roomStr;
    }

    addHandlers() {
        this.userPair[0].socket.on("send_message_type", (data, roomid) => {
            this.ioObject.to(roomid).emit("recv_message_type", data);
            console.log("handler-hit on " + data);
        })
        this.userPair[1].socket.on("send_message_type", (data, roomid) => {
            this.ioObject.to(roomid).emit("recv_message_type", data);
            console.log("handler-hit on " + data);
        })
    }

}

class User {
    constructor(id, username, socket) {
        this.id = id;
        this.username = username;
        this.socket = socket;
    }
}

class ChatManager {

    users = [];
    convos = [];
    roomStrArr = [];

    waiting_user = null;

    addUserMeathod(user_id, username, socket, ioObject) {
        var newUser = new User(user_id, username, socket);
        this.users.push(newUser);
        if (this.waiting_user === null) {
            this.waiting_user = newUser;
        }
        else {
            var newConvo = new Conversation(newUser, this.waiting_user, this.roomStrArr, ioObject);
            this.waiting_user = null;
            this.roomStrArr.push(newConvo.getRoomStr());
        }
    }

}

module.exports = { ChatManager }
