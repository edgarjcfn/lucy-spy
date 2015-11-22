interface Dispatch {
	(msg: string, payload: any): void;
}

export = Dispatch;