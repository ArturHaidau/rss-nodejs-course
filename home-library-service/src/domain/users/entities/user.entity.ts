import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'login' })
    login: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'version' })
    version: number;

    @Column({ name: 'created_at' })
    createdAt: number;

    @Column({ name: 'updated_at' })
    updatedAt: number;
}
