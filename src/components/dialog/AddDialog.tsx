"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // ✅ Make sure this is imported
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  sendername: z.string().min(2, { message: "Sendername must be at least 2 characters"}),
  letter: z.string().min(2, { message: "Letter must be at least 2 characters"}),
});

type DialogBoxProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DialogBox: React.FC<DialogBoxProps> = ({ isOpen, onClose }) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sendername: "",
      letter: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    // You can do something here like send to API
    onClose(); // optionally close the dialog after submission
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Letter</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="letter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                        <Textarea
                          placeholder="Write a note here"
                          className="resize-none"
                          {...field}
                        />
                  </FormControl>
           
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
                control={form.control}
                name="sendername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input placeholder="name of sender" {...field} />
                    </FormControl>
            
                    <FormMessage />
                  </FormItem>
                )}
              />

            <div className="flex justify-end gap-2">
              <Button type="submit">Submit</Button>
              <Button variant="destructive" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DialogBox;
