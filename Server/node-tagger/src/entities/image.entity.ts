// image.entity.ts
import { Column, Entity, ManyToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { ImageTag } from "./imageTag.entity";

@Entity()
export class Image {
  @ManyToOne(() => User, (user) => user.my_images, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: "username" })
  user: User;

  @PrimaryGeneratedColumn()
  image_index: number;

  @Column({ type: "blob" })
  image: Buffer;

  @OneToMany(() => ImageTag, (tag) => tag.image, { cascade: true }) 
  imageTags: ImageTag[];
}