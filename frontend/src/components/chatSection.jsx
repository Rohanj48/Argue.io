import io from "socket.io-client";
import { useRef, useEffect, useState } from "react";

const socket = io.connect("http://localhost:3000");

function ChatSection() {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [username, setUsername] = useState("");
    const [roomstr, setRoomstr] = useState("");
    const [motion, setMotion] = useState("");

    useEffect(() => {
        socket.on("recv_msg", (data) => {
            console.log(data);
        });
        socket.on("recv_motion", (data) => {
            console.log(data);

            setMotion(data);
        });
    }, [socket, messageList, motion]);

    function initUsernameFunc() {
        socket.emit("join", username);
    }

    socket.on("get_room", (data) => {
        setRoomstr(data);
        console.log("Joined Room with rooom_str = %d ", data);
    });

    socket.on("recv_message_type", (data) => {
        setMessageReceived(data);
        setMessageList([
            { id: messageList.length, value: data },
            ...messageList,
        ]);
        console.log(data);
    });

    function sendMessageFunc() {
        socket.emit("send_message_type", message, roomstr);
    }

    // const mbox = useRef();
    // mbox.current.addEventListener("keydown", (event) => {
    //     if (event.key === "Enter") {
    //         console.log("pressed");
    //     }
    // });

    function handleDown(event) {
        if (event.key === "Enter") {
            console.log(event.key);
            sendMessageFunc();
            event.target.value = "";
        }
    }

    return (
        <div className="p-5">
            <p className="text-xl my-5">Motion : {motion.toString()}</p>

            <input
                type="text"
                placeholder="Enter Username "
                className="m-1.5 text-slate-950"
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />
            <button
                className="text-xl bg-lime-600 rounded-md px-1.5"
                onClick={initUsernameFunc}
            >
                Connect
            </button>
            <div
                className="w-full min-h-80  rounded-md  border border-gray-100
"
            >
                {messageList.map((msg) => (
                    <p className="m-1 ml-3 " key={msg.id}>
                        {msg.value}
                    </p>
                ))}
            </div>

            <input
                type="text"
                id="message_box"
                onKeyDown={handleDown}
                className="border-black border-2 w-2/4 mx-1.5 appearance-none text-slate-950"
                placeholder="message "
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
            />
            <button
                className="text-xl bg-green-600 rounded-md px-1.5"
                onClick={sendMessageFunc}
            >
                7
            </button>
        </div>
    );
}
export default ChatSection;
