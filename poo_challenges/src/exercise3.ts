class Song {
    public title: string;
    public genre: string;
    private author: string;
  
    constructor(title: string, genre: string) {
      this.title = title;
      this.genre = genre;
      this.author = "";
    }
  
    public getAuthor(): string {return this.author;}
    public setAuthor(author: string): void {this.author = author;}
  
    public displaySongDetails(): void {
      console.log(`Title: ${this.title}`);
      console.log(`Genre: ${this.genre}`);
      console.log(`Author: ${this.getAuthor()}`);
    }
}
  
const mySong = new Song("MY EYES", "Rock");
mySong.setAuthor("Travis Scott");
mySong.displaySongDetails();