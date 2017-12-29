// © 2017 Joseph Cameron - All Rights Reserved
// Project: HTML53DRenderer
// Created on 2017-12-24.

module API
{
    export module Github
    {
        export function FetchUserRepos(aUserName: string, aPage: number, aPageSize: number, aFetchSucceeded: (aJSONdata: string)=>void, aFetchFailed: (error: any)=>void): void
        {
            fetch(`https://api.github.com/users/${aUserName}/repos?page=${aPage}&per_page=${aPageSize}`)
                .then((response) => response.text())
                    .then((data: any) =>
                    {
                        aFetchSucceeded(data);
                    }
                ).catch((error) => 
                {
                    aFetchFailed(error);
                });
        };
    }

    export module Youtube
    {
        export function CreateVideoThumbnailImage(aVideoID: string): void
        {
            const image = new Image();
            image.src = `https://img.youtube.com/vi/${aVideoID}/0.jpg`;

            image.onload = ()=>
            {
                const m_Canvas: HTMLCanvasElement  = document.createElement("canvas");
                const m_Context: CanvasRenderingContext2D = m_Canvas.getContext('2d');
                
                m_Context.drawImage(image, 0, 0, image.width, image.height, 0, 0, m_Canvas.width, m_Canvas.height);

                document.body.appendChild(m_Canvas);  
            };

            image.onerror = ()=>
            {
                throw "CreateVideoThumbnailImage failed!";
            };
        }

        export function CreateVideoIframe(aVideoID: string): HTMLIFrameElement
        {
            const iframe = document.createElement("iframe");
            iframe.setAttribute("src", "https://www.youtube.com/embed/52Gg9CqhbP8");
            iframe.style.width = 1500+"px";
            iframe.style.height = 1500+"px";
        
            return iframe;
        }
    }
}

export default API;