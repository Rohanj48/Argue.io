import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <div className="hero flex flex-col ">
            <p className="text-5xl mt-40 ml-20 mr-60 font-semibold tracking-wide italic hover:text-6xl transition-all duration-500 absolute">
                "Arguing is great for your health - think of it as cardio for
                your sanity. Who needs peace and quiet anyway?"
            </p>

            <Link to={`/chat`}>
                <button className="text-3xl px-3 py-2 my-96 ml-20 bg-blue-500 rounded-md ">
                    Get Started
                </button>
            </Link>
        </div>
    );
}

export default HeroSection;
