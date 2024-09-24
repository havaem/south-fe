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
import { EEventName } from "@/games/constants/event";
import { Animations } from "@/games/cores/Animation";
import { FrameIndexPattern } from "@/games/cores/FrameIndexPattern";
import { resources } from "@/games/cores/Resource";
import { Sprite } from "@/games/cores/Sprite";
import { Vector2 } from "@/games/cores/Vector2";
import { WorldObject } from "@/games/cores/WorldObject";
import { toGridSize } from "@/games/utils";
import { useGameObjectUpdateCurrent } from "@/hooks/mutations/useGameObjectUpdateCurrent";

import { World } from "./cores/World";
import { useReadyCharacterbuilder } from "./hooks/useReadyCharacterbuilder";

const formSchema = z.object({
    body: z.string().min(1, "Please select body type"),
    eye: z.string().min(1, "Please select eyes type"),
    hair: z.string().min(1, "Please select hair type"),
    outfit: z.string().min(1, "Please select outfit"),
});

const CharacterBuilder: React.FC = () => {
    const worldRef = useRef<World | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { mutateAsync: mutateGameObjectUpdate, isPending: isPendingGameObjectUpdate } = useGameObjectUpdateCurrent(
        {},
    );
    const { characterBodies, characterEyes, characterHair, characterOutfits } = useReadyCharacterbuilder();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            body: "",
            eye: "",
            hair: "",
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
        form.setValue("eye", eyes._id);
        form.setValue("hair", hairStyle._id);
        form.setValue("outfit", outfit._id);
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutateGameObjectUpdate({
            data: values,
        }).then((data) => {
            window.parent.postMessage({ type: EEventName.CLOSE_IFRAME }, window.location.origin);

            window.parent.postMessage(
                {
                    type: EEventName.INVALIDATE_QUERY,
                    data: {
                        filters: ["game-object", data.data._id],
                        options: { exact: true },
                    },
                },
                window.location.origin,
            );
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

        const appearanceTypes = [
            { key: "body", sprites: characterBodies },
            { key: "eye", sprites: characterEyes },
            { key: "hair", sprites: characterHair },
            { key: "outfit", sprites: characterOutfits },
        ];

        appearanceTypes.forEach(({ key, sprites }) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const selectedSprite = sprites.find((data) => data._id === form.getValues(key as any));
            if (selectedSprite) {
                person.current!.setAppearance({
                    [key]: new Sprite({
                        resource: resources.images[selectedSprite.resource._id],
                        frameSize: new Vector2(selectedSprite.frameSize.x, selectedSprite.frameSize.y),
                        hFrames: selectedSprite.horizontalFrame,
                        vFrames: selectedSprite.verticalFrame,
                        frame: selectedSprite.defaultFrame,
                        position: new Vector2(selectedSprite.position.x, selectedSprite.position.y),
                        animations: new Animations(
                            Object.values(selectedSprite.animations).reduce(
                                (acc, value) => {
                                    acc[value.name] = new FrameIndexPattern(value);
                                    return acc;
                                },
                                {} as Record<string, FrameIndexPattern>,
                            ),
                        ),
                        scale: selectedSprite.scale,
                    }),
                });
            }
        });
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
                                name="eye"
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
                                                {characterEyes.map((data) => (
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
                                name="hair"
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
                                <Button loading={isPendingGameObjectUpdate} type="submit">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};
export default CharacterBuilder;
