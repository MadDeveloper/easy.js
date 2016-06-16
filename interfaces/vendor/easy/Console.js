declare class Console {
    error(params: {title: string, message: string, consequence: string, exit: number }): void;
    success(msg: string): void;
    info(msg: string): void;
}
