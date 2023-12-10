import { Column, Entity, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Image {

  @PrimaryColumn()
  username: string;

  @PrimaryColumn({ type: "integer" }) 
  image_index: number;

  @Column({ type: "blob" }) 
  image: Buffer;
}