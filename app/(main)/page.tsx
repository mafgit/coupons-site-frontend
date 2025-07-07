import CouponPopup from "@/components/CouponPopup";
import Row from "@/components/Row";
import Search from "@/components/Search";

export default async function Home() {
  // const setCategories = useStore((state) => state.setCategories);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/home")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // setCategories(categories);
  //       console.log(data);
  //     });
  // }, []);

  const { data } = await fetch("http://localhost:5000/api/home").then((res) => {
    console.log(res);
    return res.json();
  });

  return (
    <div className="mb-[100px]">
      <Search />

      <div className="flex flex-col gap-4 items-center py-[50px] justify-center ">
        <h1 className="text-2xl font-bold text-primary">Coupons</h1>

        {Object.keys(data).map((x) => (
          <Row cards={data[x].slice(0, 4)} category={x} key={x} />
        ))}
      </div>

    </div>
  );
}
