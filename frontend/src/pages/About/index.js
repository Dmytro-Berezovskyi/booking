import { useSelector } from "react-redux";
import { Divider } from "antd";

import TravelIMG from "../../assets/images/travel.jpg";
import MissionIMG from "../../assets/images/mission.jpg";
import PromiseIMG from "../../assets/images/promise.jpg";

export default function About() {
    const themeMode = useSelector((state) => state.theme.themeMode);
    return (
        <>
            <Divider orientation="left" style={{borderColor: (themeMode === "dark" ? "rgba(255,255,255,0.20)" : "rgba(5,5,5,0.06)")}}>
                <h1 style={{
                    textTransform: "uppercase",
                    fontWeight: "800",
                    fontSize: "25px",
                    margin: 0,
                    color: (themeMode === "dark" ? "#FFFFFF" : "#000000")}}
                >
                    About us
                </h1>
            </Divider>
            <div style={{width:"50%"}}>
                <p style={{
                    color: (themeMode === "dark" ? "#FFFFFF" : "#000000"),
                    fontSize: "20px",
                    fontWeight: 400}}
                >
                    Welcome to Plan&Stay, your trusted partner in travel planning and accommodation booking.<br/>

                    At Plan&Stay, we believe that every journey begins with the perfect stay. Whether you’re embarking
                    on a solo adventure, planning a family vacation, or organizing a business trip, we’re here to ensure
                    your booking experience is seamless and tailored to your needs.<br/>

                    Our platform is built on the idea that simplicity and reliability should be at the heart of travel.
                    We provide access to a wide range of accommodations—from cozy budget stays to luxurious
                    retreats—carefully selected to suit every traveler’s style and budget.
                </p>
            </div>
            <div style={{width: "100%", height: "400px"}}>
                <img src={TravelIMG} alt="Travel Map" style={{width: "100%", height: "100%", objectFit: "cover"}}/>
            </div>

            <div style={{display: "flex", justifyContent: "space-between", marginTop: "50px"}}>
                <div style={{display: "flex", flexDirection: "column", gap: "50px", width: "50%"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h1 style={{
                            textTransform: "uppercase",
                            fontWeight: "800",
                            margin: 0,
                            color: (themeMode === "dark" ? "#FFFFFF" : "#000000")}}
                        >
                            Our Mission
                        </h1>
                        <p style={{
                            color: (themeMode === "dark" ? "#FFFFFF" : "#000000"),
                            fontSize: "20px",
                            fontWeight: 400}}
                        >
                            To empower travelers by offering an easy, transparent, and stress-free booking experience
                            that turns travel dreams into reality.
                        </p>
                    </div>

                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h1 style={{
                            textTransform: "uppercase",
                            fontWeight: "800",
                            margin: 0,
                            color: (themeMode === "dark" ? "#FFFFFF" : "#000000")}}
                        >
                            Why Choose Us?
                        </h1>
                        <p style={{
                            color: (themeMode === "dark" ? "#FFFFFF" : "#000000"),
                            fontSize: "20px",
                            fontWeight: 400}}
                        >
                            Intuitive Experience: With our user-friendly platform, booking is as easy as a few clicks.
                            Personalized Options: Our smart recommendations help you find the perfect place to stay
                            based on your preferences.
                            Transparent Pricing: No hidden fees, just clear and honest pricing.
                            24/7 Support: We’re here for you anytime, ensuring your questions are answered and your trip
                            goes smoothly.
                            Sustainability Focus: We support eco-conscious travel and partner with properties that share
                            our commitment to protecting the environment.
                        </p>
                    </div>
                </div>

                <div style={{width: "500px", height: "600px"}}>
                    <img src={MissionIMG} alt="Missiont" style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                </div>
            </div>

            <div style={{display: "flex", justifyContent: "flex-start", gap: "10px", marginTop: "50px"}}>
                <div style={{width: "500px", height: "600px"}}>
                    <img src={PromiseIMG} alt="Missiont" style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                </div>

                <div style={{display: "flex", flexDirection: "column", width: "50%"}}>
                    <h1 style={{
                        textTransform: "uppercase",
                        fontWeight: "800",
                        margin: 0,
                        color: (themeMode === "dark" ? "#FFFFFF" : "#000000")}}
                    >
                        Our Promise
                    </h1>
                    <p style={{
                        color: (themeMode === "dark" ? "#FFFFFF" : "#000000"),
                        fontSize: "20px",
                        fontWeight: 400}}
                    >
                        At Plan&Stay, we’re more than just a booking platform. We’re passionate about creating memorable
                        travel
                        experiences and helping you find comfort wherever your journey takes you.<br/>
                        Discover the world with ease. Discover it with Plan&Stay.
                    </p>
                </div>
            </div>
        </>
    )
}