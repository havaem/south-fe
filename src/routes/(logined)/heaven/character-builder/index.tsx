/* eslint-disable react/jsx-handler-names */
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import PixelBox from "@/games/components/pixel/Box";
import { EDirection } from "@/games/constants";
import { Animations } from "@/games/cores/Animation";
import { FrameIndexPattern } from "@/games/cores/FrameIndexPattern";
import { resources } from "@/games/cores/Resource";
import { Sprite } from "@/games/cores/Sprite";
import { Vector2 } from "@/games/cores/Vector2";
import { WorldObject } from "@/games/cores/WorldObject";
import { toGridSize } from "@/games/utils";
import { useGameProfileGetCurrentUser } from "@/hooks";
import { useGameObjectUpdateCurrent } from "@/hooks/mutations/useGameObjectUpdateCurrent";

import { World } from "./cores/World";
import { useReadyCharacterbuilder } from "./hooks/useReadyCharacterbuilder";

const formSchema = z.object({
    body: z.string().min(1, "Please select body type"),
    eyes: z.string().min(1, "Please select eyes type"),
    hairStyle: z.string().min(1, "Please select hair type"),
    outfit: z.string().min(1, "Please select outfit"),
});

const CharacterBuilder: React.FC = () => {
    const worldRef = useRef<World | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { data: dataGameProfile } = useGameProfileGetCurrentUser({});
    const { mutate: mutateGameObjectUpdate } = useGameObjectUpdateCurrent({});
    const { characterBodies, characterEyes, characterHair, characterOutfits } = useReadyCharacterbuilder();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            body: "",
            eyes: "",
            hairStyle: "",
            outfit: "",
        },
    });

    const person = useRef<WorldObject>();

    const handleRandomize = () => {
        const body = characterBodies[Math.floor(Math.random() * characterBodies.length)];
        const eyes = characterEyes[Math.floor(Math.random() * characterEyes.length)];
        const hairStyle = characterHair[Math.floor(Math.random() * characterHair.length)];
        const outfit = characterOutfits[Math.floor(Math.random() * characterOutfits.length)];

        form.setValue("body", body._id);
        form.setValue("eyes", eyes._id);
        form.setValue("hairStyle", hairStyle._id);
        form.setValue("outfit", outfit._id);
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutateGameObjectUpdate({
            data: {
                body: values.body,
                eye: values.eyes,
                hair: values.hairStyle,
                outfit: values.outfit,
            },
        });
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx || !canvas) return;

        canvas.width = 48;
        canvas.height = 48;
        canvas.style.width = "100%";
        canvas.style.height = "100%";

        worldRef.current = new World({ canvas, ctx });

        person.current = new WorldObject({
            facingDirection: EDirection.DOWN,
            isPlayerControlled: true,
            position: {
                x: toGridSize(1),
                y: toGridSize(1.5),
            },
        });

        worldRef.current.body.addChild(person.current);
        worldRef.current.start();

        return () => {
            worldRef.current?.stop();
        };
    }, []);

    //* Init resources
    useEffect(() => {
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
    }, [characterBodies, characterEyes, characterHair, characterOutfits]);

    useEffect(() => {
        if (!person.current) return;

        const bodySprite = characterBodies.find((data) => data._id === form.watch("body"));
        if (bodySprite) {
            person.current.setAppearance({
                body: new Sprite({
                    resource: resources.images[bodySprite.resource._id],
                    frameSize: new Vector2(bodySprite.frameSize.x, bodySprite.frameSize.y),
                    hFrames: bodySprite.horizontalFrame,
                    vFrames: bodySprite.verticalFrame,
                    frame: bodySprite.defaultFrame,
                    position: new Vector2(bodySprite.position.x, bodySprite.position.y),
                    animations: new Animations(
                        Object.entries(bodySprite.animations).reduce(
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            (acc, [_, value]) => {
                                acc[value.name] = new FrameIndexPattern(value);
                                return acc;
                            },
                            {} as Record<string, FrameIndexPattern>,
                        ),
                    ),
                    scale: bodySprite.scale,
                }),
            });
        }

        const eyesSprite = characterEyes.find((data) => data._id === form.watch("eyes"));
        if (eyesSprite) {
            person.current.setAppearance({
                eyes: new Sprite({
                    resource: resources.images[eyesSprite.resource._id],
                    frameSize: new Vector2(eyesSprite.frameSize.x, eyesSprite.frameSize.y),
                    hFrames: eyesSprite.horizontalFrame,
                    vFrames: eyesSprite.verticalFrame,
                    frame: eyesSprite.defaultFrame,
                    position: new Vector2(eyesSprite.position.x, eyesSprite.position.y),
                    animations: new Animations(
                        Object.entries(eyesSprite.animations).reduce(
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            (acc, [_, value]) => {
                                acc[value.name] = new FrameIndexPattern(value);
                                return acc;
                            },
                            {} as Record<string, FrameIndexPattern>,
                        ),
                    ),
                    scale: eyesSprite.scale,
                }),
            });
        }

        const hairSprite = characterHair.find((data) => data._id === form.watch("hairStyle"));
        if (hairSprite) {
            person.current.setAppearance({
                hairStyle: new Sprite({
                    resource: resources.images[hairSprite.resource._id],
                    frameSize: new Vector2(hairSprite.frameSize.x, hairSprite.frameSize.y),
                    hFrames: hairSprite.horizontalFrame,
                    vFrames: hairSprite.verticalFrame,
                    frame: hairSprite.defaultFrame,
                    position: new Vector2(hairSprite.position.x, hairSprite.position.y),
                    animations: new Animations(
                        Object.entries(hairSprite.animations).reduce(
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            (acc, [_, value]) => {
                                acc[value.name] = new FrameIndexPattern(value);
                                return acc;
                            },
                            {} as Record<string, FrameIndexPattern>,
                        ),
                    ),
                    scale: hairSprite.scale,
                }),
            });
        }

        const outfitSprite = characterOutfits.find((data) => data._id === form.watch("outfit"));
        if (outfitSprite) {
            person.current.setAppearance({
                outfit: new Sprite({
                    resource: resources.images[outfitSprite.resource._id],
                    frameSize: new Vector2(outfitSprite.frameSize.x, outfitSprite.frameSize.y),
                    hFrames: outfitSprite.horizontalFrame,
                    vFrames: outfitSprite.verticalFrame,
                    frame: outfitSprite.defaultFrame,
                    position: new Vector2(outfitSprite.position.x, outfitSprite.position.y),
                    animations: new Animations(
                        Object.entries(outfitSprite.animations).reduce(
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            (acc, [_, value]) => {
                                acc[value.name] = new FrameIndexPattern(value);
                                return acc;
                            },
                            {} as Record<string, FrameIndexPattern>,
                        ),
                    ),
                    scale: outfitSprite.scale,
                }),
            });
        }
    }, [form.watch()]);

    return (
        <div className="relative aspect-video w-full overflow-auto bg-white p-4">
            <h1 className="font-game">CHARACTER BUILDER</h1>
            <SelectSeparator className="mb-4 mt-2" />
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
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select body type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {characterBodies.map((data) => (
                                                    <SelectItem key={data._id} value={data._id}>
                                                        {data.name}
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
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select eyes type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {characterEyes.map((data, index) => (
                                                    <SelectItem key={data._id} value={data._id}>
                                                        {data.name}
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
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select hair type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {characterHair.map((data) => (
                                                    <SelectItem key={data._id} value={data._id}>
                                                        {data.name}
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
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select outfit" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {characterOutfits.map((data) => (
                                                    <SelectItem key={data._id} value={data._id}>
                                                        {data.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="justify-end gap-4 flex-center-y">
                                <Button type="button" variant="secondary" onClick={handleRandomize}>
                                    Randomize
                                </Button>
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};
export default CharacterBuilder;
