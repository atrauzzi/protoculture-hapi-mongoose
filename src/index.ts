import "./Extensions";


export { HapiServiceProvider } from "./HapiServiceProvider";
export { InertServiceProvider } from "./InertServiceProvider";
export { RouteType, Route, ActionRoute, DirectoryRoute, FileRoute } from "./Route";
export { Handler } from "./Handler";

export const hapiSymbols = {
    ServerOptions: Symbol("ServerOptions"),
    ServerConnectionOptions: Symbol("ServerConnectionOptions"),
    Server: Symbol("Server"),
    Route: Symbol("Route"),
    Plugin: Symbol("Plugin"),
};

export { action } from "./Decorator/Action";
