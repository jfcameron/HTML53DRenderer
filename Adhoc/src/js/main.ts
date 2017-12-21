import Timer from "Engine/Time/Timer"

function Update(): void
{
    console.log("hello");
}

const myTimer = new Timer(Update, 16);
