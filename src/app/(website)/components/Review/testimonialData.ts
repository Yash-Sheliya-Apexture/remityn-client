// src/testimonialData.ts

export interface Testimonial {
    id: string;
    author: {
        name: string;
        handle: string;
        imageUrl: string;
        imageAlt: string;
    };
    contentHtml: string; // Using HTML for content to preserve links
    timestamp: string;
}

export const testimonials: Testimonial[] = [
    {
        id: 'Tom Diaz',
        author: {
            name: 'Tom Diaz',
            handle: 'The Sales Booster',
            imageUrl: './assets/images/Tom.jpg',
            imageAlt: 'Simon Severino | The Sales Booster',
        },
        contentHtml: "It was my first time using this service, and I was impressed by how intuitive everything was. Their exchange rates beat every airport or local counter I checked. I received live updates and full transparency at every step. Their customer support was fast and friendly too. This service really makes travel money stress-free.",
        timestamp: '10:16 AM · Jan 4, 2024',
    },
    {
        id: 'John Taylor',
        author: {
            name: 'John Taylor',
            handle: 'The Sales Manager',
            imageUrl: './assets/images/John-Taylor.jpg',
            imageAlt: 'Jono Bacon',
        },
        contentHtml: `This service came highly recommended, and now I know why. I used it for a European road trip and exchanged currency for three countries. Every transaction went smoothly. It’s the best tool I’ve found for managing money during international travel.`,
        timestamp: '4:05 PM · Jan 9, 2023',
    },
    {
        id: 'Ryan Cooper',
        author: {
            name: 'Ryan Cooper',
            handle: 'PhilipLakin',
            imageUrl: './assets/images/Ryan.jpg',
            imageAlt: 'Philip Lakin',
        },
        contentHtml: "Excellent experience from start to finish! The exchange was fast, the rates were competitive, and the service felt completely secure. I’ll definitely be using this site again in the future",
        timestamp: '4:16 PM · Jul 20, 2023',
    },
    {
        id: 'Sofia Vyas',
        author: {
            name: 'Sofia Vyas',
            handle: 'martin_riedel',
            imageUrl: './assets/images/Sofia.png', // Note: original HTML had a typo here (190... instead of 170...) I used the one from the code. Re-verify if this is correct.
            imageAlt: 'Martin Riedel',
        },
        contentHtml: "The site lets you compare rates in real time before committing. I liked seeing my savings compared to other options. Support was available the moment I needed it. No unnecessary waiting or confusion. Everything was explained clearly before and after payment.I trust you this site more than my local banks",
        timestamp: '3:16 PM · Apr 16, 2024',
    },
    {
        id: 'Krunal Kathiriya',
        author: {
            name: 'Krunal Kathiriya',
            handle: 'alon',
            imageUrl: './assets/images/krunal.jpg',
            imageAlt: 'Alon',
        },
        contentHtml: "As someone who values efficiency, this website checks every box. It’s simple, secure, and offers great exchange rates. It helped me prepare for a recent trip overseas without any stress. If you travel internationally, you’ll love how easy this platform makes the process",
        timestamp: '5:57 PM · Oct 23, 2022',
    },
    {
        id: 'Lisa Carter',
        author: {
            name: 'Lisa Carter',
            handle: 'bernhardsson',
            imageUrl: './assets/images/Lisa-Carter.jpg',
            imageAlt: 'Erik Bernhardsson',
        },
        contentHtml: "I was able to exchange currency while sitting at the airport lounge. That alone is impressive.What’s even better is how intuitive the platform is. You see current rates, lock them in, and transfer money in minutes. It’s perfect when time is tight. I received updates during every step. The entire exchange felt fast and safe.",
        timestamp: '3:24 PM · Feb 15, 2022',
    },
    {
        id: 'Amelia Brown',
        author: {
            name: 'Amelia Brown',
            handle: 'iamsebdeb',
            imageUrl: './assets/images/Amelia.jpg',
            imageAlt: 'Sebastiaan Debrouwere',
        },
        contentHtml: "Safe, simple, and very efficient—this website made exchanging currency a breeze. I used it before a trip to South America, and it worked perfectly. I’ll be using it again for all my future travel needs. It’s exactly what you want when handling international money.  travel often for business and always need a reliable currency exchange platform.",
        timestamp: '10:01 PM · Apr 10, 2024',
    },
    {
        id: 'Henry Walker',
        author: {
            name: 'Henry Walker',
            handle: 'd_gershenson',
            imageUrl: "./assets/images/Henry.jpg",
            imageAlt: 'Dimitry Gershenson',
        },
        contentHtml: "My husband and I used this for our anniversary trip abroad. It made budgeting easy.We were able to lock in favorable rates before our trip and avoid surprises. I liked the option to set rate alerts via email",
        timestamp: '8:32 AM · Jan 10, 2024',
    },
    {
        id: 'Sarah Mitchell',
        author: {
            name: 'Sarah Mitchell',
            handle: 'd_gershenson',
            imageUrl: "./assets/images/Sarah.jpg",
            imageAlt: 'Dimitry Gershenson',
        },
        contentHtml: "I liked how this site showed the exact fees before the transaction. Total transparency.I could plan my travel money without guessing what I’d lose in fees. The process is mobile-friendly and accessible 24/7. I checked rates on the go and completed everything in a few minutes. That kind of convenience is hard to beat.",
        timestamp: '12:00 AM · Aug 4, 2023',
    },
    {
        id: 'Emily Clarke',
        author: {
            name: 'Emily Clarke',
            handle: 'd_gershenson',
            imageUrl: "./assets/images/Emily.avif",
            imageAlt: 'Dimitry Gershenson',
        },
        contentHtml: "It’s rare to find a service that balances speed and security. This one does both.I exchanged a decent sum before my trip and received it quickly. I loved getting an invoice with all details spelled out. No vague charges or bad surprises.",
        timestamp: '1:32 AM · Jan 4, 2024',
    },
];