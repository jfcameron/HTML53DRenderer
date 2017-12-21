// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-20.

module Exceptions
{
    export class Unimplemented extends Error 
    {
        constructor()
        {
            super("Unimplemented");
            this.name = "Unimplemented";
            this.stack = (<any> new Error()).stack;
        }
    }
}

export default Exceptions;
