// © 2017 Joseph Cameron - All Rights Reserved
// Project: CSS3DRenderer
// Created on 2017-12-02.
"use strict";

define(
[
    "./Exceptions"
], 
function() 
{
    var ImplementsInterface = function()
    {
        //var m_InterfaceList = {};

        // Public interface
        this.Implements = function(aInterface)
        {

        };

        this.RegisterInterface = function(aInterface)
        {
            if (typeof(aInterface) !== 'function')
                throw "type error";

            if (this.prototype[aInterface])
                throw "interface reregistration OR name collision!";

            this.prototype[aInterface] = aInterface;
        };

        // Constructors
        if (arguments.length == 0)
        {
        }
        else
        {
            throw Exceptions.Constructor;
        }
    };

    ImplementsInterface.prototype.Tag = "ImplementsInterface";

    return ImplementsInterface;
});
