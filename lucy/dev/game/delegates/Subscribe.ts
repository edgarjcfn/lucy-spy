interface Subscribe {
	(msg: string, handler: (payload: any) => any): void;
}

export = Subscribe;