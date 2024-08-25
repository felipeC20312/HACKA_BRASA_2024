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
import { RecebiveisSchema } from '../../../prisma/zod-schemas'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { DatePicker } from '../ui/datepicker'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Slider } from '../ui/slider'
import { cn } from '@/lib/utils'
import { MessageCircleIcon, MessageCircleWarning } from 'lucide-react'
import { Status } from '@prisma/client';

const CreateRecebivelForm = () => {

  const form = useForm<z.infer<typeof RecebiveisSchema>>({
    resolver: zodResolver(RecebiveisSchema),
    defaultValues: {
        name: '',
        description: '',
        targetAmount: 0,
        rentability: 0,
        paymentType: '',
        endDate: '',
        status: '',
    },
  });

    const {mutate: createRecebivel, isLoading} = trpc.createRecebivel.useMutation({
        onSuccess: () => {
            toast({
                title: 'Recebível criado com sucesso',
                description: 'Seu recebível foi criado com sucesso, você será redirecionado para o dashboard.',
            })
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                router.push('/pages/client/dashboard')
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

  async function onSubmit(data: z.infer<typeof RecebiveisSchema>) {

    console.log(data)

    setSubmitting(true)
    
    await createRecebivel({
        name: data.name,
        description: data.description,
        targetAmount: data.targetAmount,
        rentability: data.rentability,
        paymentType: data.paymentType || "mensal",
        endDate: data.endDate,
        status: Status.Aberto,
    })
  }

  return (
    <section className='h-full md:p-5 space-y-8 pb-4 pt-4 md:pt-0'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          {/* Cluster Details */}
          <div className='flex flex-col p-8'>
            <div className='flex-1 max-w-[100%] mr-8 space-y-2 hidden md:flex md:flex-col pb-8'>
              <h1 className='text-lg font-semibold'>Detalhes do recebível</h1>
              <h3 className='text-md text-gray-300'>Vamos à criação de sua proposta de investimento. Aqui você transformará seus recebíveis em tokens negociáveis, abrindo novas possibilidades de financiamento.</h3>
              <h3 className='text-md text-gray-300'>
              Preencha cuidadosamente o formulário abaixo com as informações do seu ativo. Cada detalhe é importante para construir uma proposta atrativa e transparente para potenciais investidores.
              </h3>
              <div className='bg-[#09090B] w-full rounded-md p-4 flex flex-row border gap-4'>
                <MessageCircleWarning size={50} className='text-white'/>
                <span className='text-white text-lg'>Lembre-se: quanto mais precisa e completa for sua proposta, maiores são as chances de atrair investidores qualificados e garantir o êxito de sua tokenização.
                </span>
              </div>
            </div>
            <div className='flex-1 bg-slate-100 p-5 rounded-lg space-y-6 text-black' >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da proposta</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição da proposta</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                  control={form.control}
                  name="targetAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alvo para arrecadação</FormLabel>
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

                <FormField
                  control={form.control}
                  name="rentability"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel>Rentabilidade para investidor: {value}%</FormLabel>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          defaultValue={[value]}
                          onValueChange={(val) => onChange(val[0])} // Extracts the first value from the array
                          className={cn("w-[30%] bg-secondary")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


              <FormField
                control={form.control}
                name="paymentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recorrencia</FormLabel>
                    <FormControl>
                    <Select onValueChange={(value) => {
                        field.onChange(value)
                      }}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Clique aqui" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Recorrencias</SelectLabel>
                          <SelectItem value="diario">Diario</SelectItem>
                          <SelectItem value="semanal">Semanal</SelectItem>
                          <SelectItem value="mensal">Mensal</SelectItem>
                          <SelectItem value="semestral">Semestral</SelectItem>
                          <SelectItem value="anual">Anual</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data limite para vencimento</FormLabel>
                    <FormControl>
                    <Input
                      type="date"
                      value={typeof field.value === 'string' && !isNaN(Date.parse(field.value))
                        ? new Date(field.value).toISOString().split('T')[0]
                        : ""}
                        onChange={(e) => {
                          // Ensure correct date is sent
                          const dateValue = new Date(`${e.target.value}T07:00:00`);
                          const pacificDate = moment.tz(dateValue, 'America/Los_Angeles').format();
                          field.onChange(pacificDate.split('T')[0]);
                        }}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                      name={field.name}
                      ref={field.ref}
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
  export default CreateRecebivelForm;