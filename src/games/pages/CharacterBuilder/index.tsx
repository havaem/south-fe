import { Button, Separator } from "@ariakit/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EDirection } from "@/games/constants";
import { Animations } from "@/games/cores/Animation";
import { FrameIndexPattern } from "@/games/cores/FrameIndexPattern";
import { resources } from "@/games/cores/Resource";
import { Sprite } from "@/games/cores/Sprite";
import { Vector2 } from "@/games/cores/Vector2";
import { WorldObject } from "@/games/cores/WorldObject";
import characterAssets from "@/games/mocks/character.json";
import { toGridSize } from "@/games/utils";
import { PERSON_ANIMATIONS } from "@/games/utils/personAnimation";

import { World } from "./cores/World";

const formSchema = z.object({
    body: z.string(),
    eyes: z.string(),
    hairStyle: z.string(),
    outfit: z.string(),
});

const CharacterBuilder: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            body: Object.keys(characterAssets.characters.bodies)[0],
            eyes: Object.keys(characterAssets.characters.eyes)[0],
            hairStyle: Object.keys(characterAssets.characters.hairStyles)[0],
            outfit: Object.keys(characterAssets.characters.outfits)[0],
        },
    });

    const person = useRef<WorldObject>();

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    useEffect(() => {
        //* Init resources
        Object.entries(characterAssets.characters.bodies).forEach(([key, value]) => {
            resources.pushImage(key, value);
        });
        Object.entries(characterAssets.characters.eyes).forEach(([key, value]) => {
            resources.pushImage(key, value);
        });
        Object.entries(characterAssets.characters.hairStyles).forEach(([key, value]) => {
            resources.pushImage(key, value);
        });
        Object.entries(characterAssets.characters.outfits).forEach(([key, value]) => {
            resources.pushImage(key, value);
        });

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx || !canvas) return;

        canvas.width = 48;
        canvas.height = 48;
        canvas.style.width = "100%";
        canvas.style.height = "100%";

        const world = new World({ canvas, ctx });
        world.init();

        person.current = new WorldObject({
            facingDirection: EDirection.DOWN,
            isPlayerControlled: true,
            position: {
                x: toGridSize(1),
                y: toGridSize(1.5),
            },
            body: new Sprite({
                resource: resources.images[form.watch("body")],
                frameSize: new Vector2(toGridSize(1), toGridSize(2)),
                hFrames: 28,
                vFrames: 20,
                frame: 28,
                position: new Vector2(0, -20),
                animations: new Animations({
                    standDown: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_DOWN),
                    standUp: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_UP),
                    standLeft: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_LEFT),
                    standRight: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_RIGHT),
                }),
            }),
            eyes: new Sprite({
                resource: resources.images[form.watch("eyes")],
                frameSize: new Vector2(toGridSize(1), toGridSize(2)),
                hFrames: 28,
                vFrames: 20,
                frame: 28,
                position: new Vector2(0, -20),
                animations: new Animations({
                    standDown: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_DOWN),
                    standUp: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_UP),
                    standLeft: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_LEFT),
                    standRight: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_RIGHT),
                }),
            }),
            hairStyle: new Sprite({
                resource: resources.images[form.watch("hairStyle")],
                frameSize: new Vector2(toGridSize(1), toGridSize(2)),
                hFrames: 28,
                vFrames: 20,
                frame: 28,
                position: new Vector2(0, -20),
                animations: new Animations({
                    standDown: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_DOWN),
                    standUp: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_UP),
                    standLeft: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_LEFT),
                    standRight: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_RIGHT),
                }),
            }),
            outfit: new Sprite({
                resource: resources.images[form.watch("outfit")],
                frameSize: new Vector2(toGridSize(1), toGridSize(2)),
                hFrames: 28,
                vFrames: 20,
                frame: 28,
                position: new Vector2(0, -20),
                animations: new Animations({
                    standDown: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_DOWN),
                    standUp: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_UP),
                    standLeft: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_LEFT),
                    standRight: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_RIGHT),
                }),
            }),
        });

        world.body.addChild(person.current);
        world.start();

        return () => {
            world.stop();
        };
    }, []);

    useEffect(() => {
        if (!person.current) return;

        person.current.body.resource = resources.images[form.watch("body")];
        if (person.current.eyes) person.current.eyes.resource = resources.images[form.watch("eyes")];
        if (person.current.hairStyle) person.current.hairStyle.resource = resources.images[form.watch("hairStyle")];
        if (person.current.outfit) person.current.outfit.resource = resources.images[form.watch("outfit")];
        return () => {};
    }, [form.watch()]);

    return (
        <div className="z-10 aspect-video w-full overflow-auto bg-white p-4">
            <h1 className="font-game">CHARACTER BUILDER</h1>
            <Separator className="mb-4 mt-2" />
            <div className="flex gap-8">
                <div className="relative size-80 bg-white p-4 before:absolute before:-inset-x-[3px] before:inset-y-0 before:-z-10 before:bg-black after:absolute after:-inset-y-[3px] after:inset-x-0 after:-z-10 after:bg-black">
                    <canvas ref={canvasRef}></canvas>
                </div>
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
                                                {Object.entries(characterAssets.characters.bodies).map(([key]) => (
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
                                                {Object.entries(characterAssets.characters.eyes).map(([key]) => (
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
                                                {Object.entries(characterAssets.characters.hairStyles).map(([key]) => (
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
