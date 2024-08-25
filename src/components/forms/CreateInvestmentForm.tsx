'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import moment from 'moment-timezone';
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import * as React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { trpc } from '@/app/_trpc/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"
import { InvestmentSchema } from '../../../prisma/zod-schemas'
import { Input } from '../ui/input'
import { MessageCircleWarning } from 'lucide-react'

const CreateInvestmentForm = ({recebivelId} : {recebivelId: string}) => {

  const form = useForm<z.infer<typeof InvestmentSchema>>({
    resolver: zodResolver(InvestmentSchema),
    defaultValues: {
        amount: 0,
    },
  });

    const {mutate: createInvestment, isLoading} = trpc.createInvestment.useMutation({
        onSuccess: () => {
            toast({
                title: 'Investimento criado com sucesso',
                description: 'Seu investimento foi criado com sucesso, você será redirecionado para o dashboard.',
            })
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                router.push('/pages/investor/dashboard')
            }, 2000)
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message,
            })
            setSubmitting(false)
        },
    })

  const { toast } = useToast()

  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()

  async function onSubmit(data: z.infer<typeof InvestmentSchema>) {

    console.log(data)

    setSubmitting(true)
    
    await createInvestment({
        amount: data.amount,
        recebivelId: recebivelId,
    })
  }

  return (
    <section className='h-full md:p-5 space-y-8 pb-4 pt-4 md:pt-0'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/3 space-y-6">
          {/* Cluster Details */}
          <div className='flex flex-col p-8'>
            <div className='flex-1 p-5 rounded-lg space-y-6 text-white' >
              <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                            <Input
                                placeholder="$0"
                                {...field}
                                value={field.value?.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                })} // Format default value as currency
                                onChange={(e) => {
                                    const rawValue = e.target.value;
                                    // Replace non-numeric characters except '.'
                                    let sanitizedValue = rawValue.replace(/[^\d.]/g, '');
                                    sanitizedValue = sanitizedValue.length > 0 ? sanitizedValue : '0';
                                    // Update the field value
                                    field.onChange(parseFloat(sanitizedValue));
                                }}
                            />
                        </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          </div>
        
          <div className='flex flex-row justify-end space-x-4 border-t pt-8'>
            <Button
              type="button"
              className='w-48 bg-gray-300 hover:bg-gray-400 border-gray-300 border-1 text-black'
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
              { /* Submit button */
                submitting ? (
                  <Button disabled type="submit" className='w-48'>
                    <ReloadIcon className="mr-2 h-5 w-5 animate-spin" color='black'/>
                  </Button>
                ) : (
                  <Button type="submit" className='w-48'>
                    Continuar
                  </Button>
                )
              }
          </div>
        </form>
      </Form>
    </section>
  );
  };
  export default CreateInvestmentForm;