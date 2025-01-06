<?php

namespace Database\Seeders;

use App\Models\Accommodation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccommodationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accommodations = [
            [
                'name' => 'Playa Paraíso',
                'description' => 'A beachfront paradise offering breathtaking views of the Pacific Ocean, ideal for surfing and relaxation.'
            ],
            [
                'name' => 'Montaña Verde Lodge',
                'description' => 'A cozy mountain retreat nestled in the heart of El Salvador’s lush coffee plantations.'
            ],
            [
                'name' => 'Casa Colonial San Salvador',
                'description' => 'A charming colonial-style accommodation located near the historic center of San Salvador.'
            ],
            [
                'name' => 'EcoVillage Lago Coatepeque',
                'description' => 'Eco-friendly cabins with direct access to the crystal-clear waters of Lake Coatepeque.'
            ],
            [
                'name' => 'Hotel El Encanto de Suchitoto',
                'description' => 'A boutique hotel offering a blend of culture and comfort in the picturesque town of Suchitoto.'
            ],
            [
                'name' => 'Villas El Zonte Surf Resort',
                'description' => 'Modern villas designed for surfers and beach lovers, located on the famous El Zonte beach.'
            ],
            [
                'name' => 'Cerro Verde Glamping',
                'description' => 'Unique glamping experiences surrounded by the stunning views of the Cerro Verde National Park.'
            ],
            [
                'name' => 'Casa del Sol Apaneca',
                'description' => 'A vibrant accommodation in Apaneca, perfect for exploring the Ruta de las Flores.'
            ],
            [
                'name' => 'El Pital Highland Lodge',
                'description' => 'A high-altitude escape in Chalatenango, known for its cool climate and serene environment.'
            ],
            [
                'name' => 'La Cocotera Eco Lodge',
                'description' => 'A sustainable beachfront lodge located in Barra de Santiago, surrounded by mangroves and wildlife.'
            ],
            [
                'name' => 'Sunset Vista La Libertad',
                'description' => 'A luxury hotel with stunning ocean sunsets and proximity to the famous Punta Roca surf spot.'
            ],
            [
                'name' => 'Casa Blanca Residences',
                'description' => 'Comfortable and spacious accommodations in Santa Tecla, close to shopping and dining.'
            ],
            [
                'name' => 'El Tunco Chill Hostel',
                'description' => 'A laid-back hostel perfect for backpackers, located in the vibrant El Tunco beach area.'
            ],
            [
                'name' => 'Cascadas de Izalco Lodge',
                'description' => 'A serene hideaway near the Izalco Volcano, ideal for hikers and nature enthusiasts.'
            ],
            [
                'name' => 'Hostal Santa Ana Centro',
                'description' => 'Affordable and convenient lodging in the heart of Santa Ana, close to the cathedral and theater.'
            ],
            [
                'name' => 'Rancho Estero y Mar',
                'description' => 'A beachfront resort with lush gardens, pools, and activities for the whole family.'
            ],
            [
                'name' => 'Hotel La Palma Artístico',
                'description' => 'A colorful and artistic hotel inspired by the works of Fernando Llort, located in La Palma.'
            ],
            [
                'name' => 'Maya Sunset Lodge',
                'description' => 'A tranquil retreat near the Joya de Cerén archaeological site, a UNESCO World Heritage Site.'
            ],
            [
                'name' => 'Laguna Verde Retreat',
                'description' => 'A peaceful lodge near Laguna Verde, perfect for birdwatching and relaxing in nature.'
            ],
            [
                'name' => 'Mar y Sol Beach Villas',
                'description' => 'Spacious beachfront villas in Costa del Sol, offering luxury and privacy for guests.'
            ],
        ];

        Accommodation::factory(count($accommodations))->sequence(fn($sequence) => [
            'name' => $accommodations[$sequence->index]['name'],
            'description' => $accommodations[$sequence->index]['description'],
        ])->create();
    }
}
