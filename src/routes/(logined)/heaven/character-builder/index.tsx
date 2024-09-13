/* eslint-disable react/jsx-handler-names */
import { Button, Separator } from "@ariakit/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PixelBox from "@/games/components/pixel/Box";
import { resources } from "@/games/cores/Resource";
import { WorldObject } from "@/games/cores/WorldObject";
import characterAssets from "@/games/mocks/character.json";
import { useSpriteGetCharacterBuilder } from "@/hooks/queries/useSpriteGetCharacterBuilder";

import { World } from "./cores/World";

const formSchema = z.object({
    body: z.string(),
    eyes: z.string(),
    hairStyle: z.string(),
    outfit: z.string(),
});

const CharacterBuilder: React.FC = () => {
    const worldRef = useRef<World | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // body: Object.keys(characterAssets.characters.bodies)[0],
        },
    });

    const { data: dataSpriteGetCharacterBuilder } = useSpriteGetCharacterBuilder({});

    const person = useRef<WorldObject>();

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    useEffect(() => {
        if (!dataSpriteGetCharacterBuilder) return;

        const characterAccessories = dataSpriteGetCharacterBuilder.data.CHARACTER_ACCESSORY;
        const characterBodies = dataSpriteGetCharacterBuilder.data.CHARACTER_BODY;
        const characterEyes = dataSpriteGetCharacterBuilder.data.CHARACTER_EYES;
        const characterHair = dataSpriteGetCharacterBuilder.data.CHARACTER_HAIR;
        const characterOutfits = dataSpriteGetCharacterBuilder.data.CHARACTER_OUTFIT;

        //* Init resources
        characterBodies.forEach((sprite) => {
            resources.pushImage(sprite.resource._id, sprite.resource.src);
        });
        characterEyes.forEach((sprite) => {
            resources.pushImage(sprite.resource._id, sprite.resource.src);
        });
        characterHair.forEach((sprite) => {
            resources.pushImage(sprite.resource._id, sprite.resource.src);
        });
        characterOutfits.forEach((sprite) => {
            resources.pushImage(sprite.resource._id, sprite.resource.src);
        });
        characterAccessories.forEach((sprite) => {
            resources.pushImage(sprite.resource._id, sprite.resource.src);
        });

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx || !canvas) return;

        canvas.width = 48;
        canvas.height = 48;
        canvas.style.width = "100%";
        canvas.style.height = "100%";

        worldRef.current = new World({ canvas, ctx });

        // person.current = new WorldObject({
        //     facingDirection: EDirection.DOWN,
        //     isPlayerControlled: true,
        //     position: {
        //         x: toGridSize(1),
        //         y: toGridSize(1.5),
        //     },
        //     // body: new Sprite({
        //     //     resource: resources.images[form.watch("body")],
        //     //     frameSize: new Vector2(toGridSize(1), toGridSize(2)),
        //     //     hFrames: 28,
        //     //     vFrames: 20,
        //     //     frame: 28,
        //     //     position: new Vector2(0, -20),
        //     //     animations: new Animations({
        //     //         [EAnimation.STAND_DOWN]: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_DOWN),
        //     //         [EAnimation.STAND_UP]: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_UP),
        //     //         [EAnimation.STAND_LEFT]: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_LEFT),
        //     //         [EAnimation.STAND_RIGHT]: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_RIGHT),
        //     //         [EAnimation.WALK_DOWN]: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_DOWN),
        //     //         [EAnimation.WALK_UP]: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_UP),
        //     //         [EAnimation.WALK_LEFT]: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_LEFT),
        //     //         [EAnimation.WALK_RIGHT]: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_RIGHT),
        //     //     }),
        //     // }),
        // });

        // world.body.addChild(person.current);
        // world.start();

        return () => {
            worldRef.current?.stop();
        };
    }, [dataSpriteGetCharacterBuilder]);

    useEffect(() => {
        if (!person.current) return;

        const body = form.watch("body");
        if (body) {
            // person.current.body = new Sprite({
            //     resource: resources.images[data.resource._id],
            //     frameSize: new Vector2(data.frameSize.x, data.frameSize.y),
            //     hFrames: data.horizontalFrame,
            //     vFrames: data.verticalFrame,
            //     frame: data.defaultFrame,
            //     position: new Vector2(0, -20),
            //     animations: new Animations(
            //         Object.entries(data.animations).reduce(
            //             // eslint-disable-next-line @typescript-eslint/no-unused-vars
            //             (acc, [_, value]) => {
            //                 acc[value.name] = new FrameIndexPattern(value);
            //                 return acc;
            //             },
            //             {} as Record<string, FrameIndexPattern>,
            //         ),
            //     ),
            // });
        }

        // if (person.current.eyes) person.current.eyes.resource = resources.images[form.watch("eyes")];
        // if (person.current.hairStyle) person.current.hairStyle.resource = resources.images[form.watch("hairStyle")];
        // if (person.current.outfit) person.current.outfit.resource = resources.images[form.watch("outfit")];
        return () => {};
    }, [form.watch()]);

    return (
        <div className="relative aspect-video w-full overflow-auto bg-white p-4">
            <h1 className="font-game">CHARACTER BUILDER</h1>
            <Separator className="mb-4 mt-2" />
            <div className="flex gap-8">
                <PixelBox noPadding className="relative z-10 size-80">
                    <canvas ref={canvasRef}></canvas>
                </PixelBox>
                <div className="flex-1">
                    <Form {...form}>
                        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="body"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Body</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select body type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {(dataSpriteGetCharacterBuilder?.data.CHARACTER_BODY ?? []).map(
                                                    (data, index) => (
                                                        <SelectItem key={data._id} value={data._id}>
                                                            Body {index}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="eyes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Eyes</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select eyes type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {(dataSpriteGetCharacterBuilder?.data.CHARACTER_EYES ?? []).map(
                                                    (data, index) => (
                                                        <SelectItem key={data._id} value={data._id}>
                                                            Eyes {index}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="hairStyle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hair Style</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select hair type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {(dataSpriteGetCharacterBuilder?.data.CHARACTER_EYES ?? []).map(
                                                    (data, index) => (
                                                        <SelectItem key={data._id} value={data._id}>
                                                            Eyes {index}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="outfit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Outfit</FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select outfit" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.entries(characterAssets.characters.outfits).map(([key]) => (
                                                    <SelectItem key={key} value={key}>
                                                        {key}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};
export default CharacterBuilder;
