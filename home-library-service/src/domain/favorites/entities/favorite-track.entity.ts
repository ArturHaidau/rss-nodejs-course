import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../../tracks/entities/track.entity';

@Entity({ name: 'favorite_tracks' })
export class FavoriteTrack {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @OneToOne(() => Track)
    @JoinColumn({ name: 'track_id' })
    track: Track;
}
