module.exports = class {
	constructor() {
		this.aliases = ["s"];
	}

	run(music, msg, i, flags) { // TODO: Add vote system
		if(i && i-- !== 0){ // Note that i is now 0-indexed.
			if(isNaN(i) || i < 0 || i >= music.queue.length)return "Please choose a valid index.";
			if(msg.member.id !== music.queue[i].dj)return "You are not a DJ of that song in queue!";
			const title = music.queue[i].snippet.title;
			music.queue.splice(i, 1);
			return `Removed **\`${ title }\`** from queue.`;
		}
		if(!music.nowPlaying)return "No songs currently playing";
		const content = `Skipped **\`${ music.nowPlaying.snippet.title }\`**.`;
		music.nowPlaying = false;
		music.dispatcher.end();
		if(music.repeat)music.queue.pop();
		return { content, delete: 5000 };
	}
}