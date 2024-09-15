class HeaderPage {
    private title: string;
    private color: string;
    private font: string;
    private allign: 'left' | 'center' | 'right';
  
    constructor(title: string, color: string, font: string) {
        this.title = title;
        this.color = color;
        this.font = font;
        this.allign = 'left';
    }
  
    getProperties(): { title: string, color: string, font: string } {
        return {
            title: this.title,
            color: this.color,
            font: this.font
        };
    }
  
    changeAllign(allign: 'left' | 'center' | 'right'): void {
        this.allign = allign;
    }
  
    toString(): void {
        console.log(`Title: ${this.title}`);
        console.log(`Color: ${this.color}`);
        console.log(`Font: ${this.font}`);
        console.log(`Allign: ${this.allign}`);
    }
}

const header = new HeaderPage('Hello', 'red', 'Arial');
header.changeAllign('center');
header.toString();
  