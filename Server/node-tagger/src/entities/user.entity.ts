import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Image } from "./image.entity";

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_active: boolean;

  @OneToMany(() => Image, (image) => image.user, { cascade: true, eager: true }) // Added eager loading for immediate loading
  my_images: Image[];

}