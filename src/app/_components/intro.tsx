import { CMS_NAME } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
       RAG pipeline tutorial  
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Created by <a href="https://zackproser.com" target="_blank" className="text-blue-500 hover:text-blue-700">Zachary Proser</a> 
      </h4>
    </section>
  );
}
