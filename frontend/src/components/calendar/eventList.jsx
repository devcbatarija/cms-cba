import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function EventList({
  title,
  eventsByMonth
}) {
  return (
    <div>
      <div className="px-4 sm:px-0 flex flex-row justify-center">
        <h1 className='uppercase leading-7 text-base font-light text-gray-900'>Eventos para {title}</h1>
      </div>
      <div className="mt-6 border-t border-gray-300">
        <dl className="divide-y divide-gray-300">
          {eventsByMonth.map((event) => (
            <div key={event.Evento?event.id_Evento:event.id} className="px-4 py-6 sm:grid sm:grid-cols-4  sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900"><img className='h-16 w-16' src={event.Evento?event.multimedia[0]:'https://png.pngtree.com/png-vector/20220820/ourlarge/pngtree-certificate-flat-blue-color-rounded-vector-icon-event-attest-approval-vector-png-image_19608048.jpg  '} alt="" /></dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">{event.Evento?event.Evento.title:event.title}</dd>
            </div>
          ))}

        </dl>
      </div>
    </div>
  )
}
