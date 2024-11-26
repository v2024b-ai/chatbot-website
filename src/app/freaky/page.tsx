import Image from "next/image";

export default function page() {

  return (
    <div className="flex flex-col items-center justify-center">
      AI TEAM WAS HERE!!!
      stay freaky ;)
      <Image
        src='/freaky.webp'
        alt='freaky'
        width={720}
        height={420}
      />
    </div>
  )
}
