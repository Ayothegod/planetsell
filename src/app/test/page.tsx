import {getData} from "@/lib/actions/todoActions";
import AddTodo from "@/components/build/AddTodo";
import Todo from "@/components/build/Todo";
import Todos from "@/components/build/Todos";

export default async function Home() {
  // const data = await getData();
  // console.log(data)
  
  return (
    <main>
        <p>Hello TestTodo</p>
        {/* <Todos todos={data} /> */}
    </main>
  )
}