import DashboardTable from '@/components/custom/dashboardTable';
import SideBar from '@/components/custom/sidebar';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <SideBar>
      <div className='flex w-full h-full p-8 bg-[#151518] rounded-2xl'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col box-border w-[1052px] h-[206px] p-6 bg-[#09090B] text-white'>
            <h3 className='font-semibold'>Tokenize seus recebiveis agora</h3>
            <p className='font-thin'>
              Transforme suas oportunidades em liquidez imediata! Tokenize seus
              recebíveis e acesse uma rede global de investidores. Facilite a
              antecipação de crédito e maximize o potencial do seu capital.
            </p>
            <div>
              <Link href={'/'}>
                <button>Criar propostas de investimento</button>
              </Link>
            </div>
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col box-border w-[514px] h-[224px] p-6 bg-[#09090B]'></div>
            <div className='flex flex-col box-border w-[514px] h-[224px] p-6 bg-[#09090B]'></div>
          </div>
          <div>
            <div className='flex justify-between'>
              <div className='flex gap-3 w-max px-3 py-1 bg-[#27272A] text-white'>
                <button>Todos</button>
                <button>Em Aberto</button>
                <button>Em Pagamento</button>
              </div>
              <div>
                <button>Filtrar</button>
              </div>
            </div>
            <DashboardTable />
          </div>
        </div>
        <div></div>
      </div>
    </SideBar>
  );
}
