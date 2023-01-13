import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';

@Entity({ name: 'favorite_artists' })
export class FavoriteArtist {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @OneToOne(() => Artist)
    @JoinColumn({ name: 'artist_id' })
    artist: Artist;
}
