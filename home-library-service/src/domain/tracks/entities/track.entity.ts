import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity({ name: 'tracks' })
export class Track {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'name' })
    name: string;

    @ManyToOne(() => Artist)
    @JoinColumn({ name: 'artist_id' })
    artist: Artist | null;

    @ManyToOne(() => Album)
    @JoinColumn({ name: 'album_id' })
    album: Album | null;

    @Column({ name: 'duration' })
    duration: number;
}
