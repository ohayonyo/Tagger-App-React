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

  @OneToMany(() => Image, (image) => image.user, { cascade: true }) // Added cascade option for cascading operations
  my_images: Image[];
}