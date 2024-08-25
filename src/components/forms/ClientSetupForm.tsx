'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
import { useEffect, useState } from 'react'
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"
import { ClientSetupFormSchema } from '../../../prisma/zod-schemas'
import { Input } from '../ui/input'

const ClientSetupForm = () => {

  const form = useForm<z.infer<typeof ClientSetupFormSchema>>({
    resolver: zodResolver(ClientSetupFormSchema),
    defaultValues: {
        cnpj: "",
        businessName: "",
        address: "",
        CEP: "",
        city: "",
        state: "",
        businessType: "",
    },
  });

    const {mutate: clientSetup, isLoading: isLoadingClient} = trpc.clientSetup.useMutation({
        onSuccess: () => {
            router.push('/pages/client/dashboard')
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message,
            })
        },
    })

  const { toast } = useToast()

  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()

  async function onSubmit(data: z.infer<typeof ClientSetupFormSchema>) {

    setSubmitting(true)
    
    await clientSetup({
        cnpj: data.cnpj,
        businessName: data.businessName,
        address: data.address,
        CEP: data.CEP,
        city: data.city,
        state: data.state,
        businessType: data.businessType,
    })
  }

  return (
    <section className='h-full md:p-5 space-y-8 pb-4 pt-4 md:pt-0'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/3 space-y-6">
          {/* Cluster Details */}
          <div className='flex flex-row'>
            <div className='flex-1 max-w-sm md:max-w-xs mr-8 space-y-2 hidden md:flex md:flex-col'>
              <h1 className='text-lg font-semibold'>Detalhes da conta</h1>
              <h3 className='text-md text-gray-300'>Esta sessão busca captar os detalhes da pesssoa jurídica.</h3>
            </div>
            <div className='flex-1 bg-white p-5 rounded-lg space-y-6 text-black' >
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
          </div>

          {/* View */}
          <div className='flex flex-row border-t pt-6'>
            <div className='flex-1 max-w-sm md:max-w-xs mr-8 space-y-2 hidden md:flex md:flex-col'>
              <h1 className='text-lg font-semibold'>Endereço</h1>
              <h3 className='text-md text-gray-300'>O endereçõ físico da sua empresa, atrelaçado ao CNPJ.</h3>
            </div>
            <div className='flex-1 bg-white p-5 rounded-lg space-y-6 text-black'>
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                        <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                        <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                        <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="CEP"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                        <Input placeholder="" {...field} />
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
                    <ReloadIcon className="mr-2 h-5 w-5 animate-spin" color='white'/>
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
  export default ClientSetupForm;