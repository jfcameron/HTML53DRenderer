// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-24.

module API
{
    export function FetchGitHubRepos()
    {
        let user = "jfcameron";
        let page = 1;
        let perPage = 30;
        fetch(`https://api.github.com/users/${user}/repos?page=${page}&per_page=${perPage}`)
            .then((response) => response.text())
                .then((data: any) =>
                {
                    console.log(data);
                }
            ).catch((error) => 
            {
                console.log(error);
            });
    };

    export function FetchYouTubeThumbnail(aVideoID: string) //Doesnt work because of security, move to a Canvas 2D context implementation.
    {
        //let image: HTMLImageElement = new Image();

        fetch(`https://img.youtube.com/vi/${aVideoID}/0.jpg`)
            .then((response) => response.blob())
                .then((data: any) =>
                {
                    var objectURL = URL.createObjectURL(data);
                    //image.src = objectURL;
                    //return objectURL;

                    let imgnode = document.createElement("img");
                    imgnode.setAttribute("src", objectURL);
                    document.body.appendChild(imgnode);
                }
            ).catch((error) =>
            {

            });

        //return image;
    }
}

export default API;