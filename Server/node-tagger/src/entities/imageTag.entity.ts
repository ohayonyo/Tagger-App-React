import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Image } from "./image.entity";

@Entity()
export class ImageTag {
  @PrimaryGeneratedColumn()
  tag_id: number;

  @ManyToOne(() => Image, (image) => image.imageTags, { onDelete: 'CASCADE' }) // Added onDelete option for cascading delete
  @JoinColumn({ name: "image_index" }) 
  image: Image;

  @Column()
  tag_name: string;

  @Column()
  x1_coordinate: number;

  @Column()
  y1_coordinate: number;

  @Column()
  x2_coordinate: number;

  @Column()
  y2_coordinate: number;
}