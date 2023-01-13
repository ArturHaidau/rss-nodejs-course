import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';

@Entity({ name: 'favorite_albums' })
export class FavoriteAlbum {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @OneToOne(() => Album)
    @JoinColumn({ name: 'album_id' })
    album: Album;
}
