import { useRef } from "react"

export default function TweetsRef(id: string) {
  console.log("ref-" + id);
  let refList: any = {}
  let refSerial: string = "ref-" + id
  refList[refSerial] = useRef<HTMLDivElement>(null);
  console.log(refList);
  return refList.refSerial
}
