// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-20.

/**
* @description defines projectwide exceptions
*/
module Exceptions
{
    /**
    * @description Thrown from stub functions, stub classes
    */
    export class Unimplemented extends Error 
    {
        constructor()
        {
            super("Unimplemented");
            this.name = "Unimplemented";
            this.stack = (<any> new Error()).stack;
        }
    }

    /**
    * @description Thrown at instantiation of a class whose ancestor was not designed to be subclassed
    * @note This is a workaround for lack of compile time assertion that a class type is unsubclassable in TS 2.6.2. Refer to C++11/Java's Final, C#'s sealed
    */
    export class Sealed extends Error 
    {
        constructor()
        {
            super("Sealed");
            this.name = "Sealed";
            this.stack = (<any> new Error()).stack;
        }
    }
}

export default Exceptions;
