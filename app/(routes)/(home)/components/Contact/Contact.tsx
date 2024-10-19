import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Contact() {
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
  </div>
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contacto</h2>
    <p className="mt-2 text-lg leading-8 text-gray-600">Envianos un mensaje por si le surge alguna duda.</p>
  </div>
  <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label className="block text-sm font-semibold leading-6 text-gray-900">Nombre</label>
        <div className="mt-2.5">
          <Input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold leading-6 text-gray-900">Apellidos</label>
        <div className="mt-2.5">
          <Input type="text" name="last-name" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
        <div className="mt-2.5">
          <Input type="email" name="email" id="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold leading-6 text-gray-900">Numero de telefono</label>
        <div className="relative mt-2.5">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <label className="sr-only">Country</label>
            <select id="country" name="country" className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-2 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
              <option>+34</option>
              <option>+55</option>
              <option>+65</option>
              <option>+14</option>
            </select>
          </div>
          <Input type="tel" name="phone-number" id="phone-number" className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold leading-6 text-gray-900">Mensaje</label>
        <div className="mt-2.5">
          <textarea name="message" id="message" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>
      </div>
    </div>
    <div className="mt-10">
      <Button type="submit" className="block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Enviar</Button>
    </div>
  </form>
</div>
  )
}
