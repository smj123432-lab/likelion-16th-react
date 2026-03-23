import S from "./ShoppingCart.module.css";
import { useImmer } from "use-immer";

const INITIAL_CART = [
  { id: 1, name: "기계식 키보드", price: 28100, quantity: 1 },
  { id: 2, name: "게이밍 마우스", price: 25300, quantity: 1 },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ShoppingCart() {
  console.log(INITIAL_CART);

  const [cart, updateCart] = useImmer<CartItem[]>(INITIAL_CART);

  const handleQuantity = (id: number, delta: number) => {
    updateCart((draft) => {
      const item = draft.find((item) => item.id === id); // id로 찾기
      if (item) {
        item.quantity = Math.max(1, item.quantity + delta); // 1 미만으로 안 내려가게
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("진짜 삭제?")) {
      updateCart((draft) => {
        const Index = draft.findIndex((item) => item.id === id);
        draft.splice(Index, 1);
      });
    }
  };

  const handleClear = () => {
    updateCart([]); // 빈 배열 반환
  };

  const handleRestore = () => {
    updateCart(INITIAL_CART);
  };

  const hasCartItems = cart.length > 0;
  return (
    <section className={S.container}>
      <h2 className={S.title}>장바구니 실습 (수량 조절)</h2>

      <ul className={S.itemList}>
        {cart.map(({ id, name, price, quantity }) => (
          <li key={id} className={S.item}>
            <div className={S.info}>
              <p className={S.name}>{name}</p>
              <p className={S.price}>{price.toLocaleString()}원</p>
            </div>

            <div className={S.controls}>
              <button
                type="button"
                className={S.button}
                onClick={() => {
                  if (quantity === 1) return;
                  handleQuantity(id, -1);
                }}
                aria-disabled={quantity === 1 ? true : false}
                aria-label={`${name} 수량 감소`}
              >
                -
              </button>
              <span className={S.quantity}>{quantity}</span>
              <button
                type="button"
                className={S.button}
                onClick={() => handleQuantity(id, 1)}
                aria-label={`${name} 수량 감소`}
              >
                +
              </button>
              <button
                type="button"
                className={S.deleteButton}
                onClick={() => handleDelete(id)}
                aria-label={`${name} 삭제`}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
      {hasCartItems ? (
        <button onClick={handleClear} className={S.clearButton}>
          비움
        </button>
      ) : (
        <button onClick={handleRestore} className={S.clearButton}>
          복구하기
        </button>
      )}
    </section>
  );
}
