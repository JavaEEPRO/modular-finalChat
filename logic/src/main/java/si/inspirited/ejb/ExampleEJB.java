package si.inspirited.ejb;

import org.apache.commons.lang3.StringUtils;
import si.inspirited.domain.entityes.UserEntity;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Lord Jesus
 */

@Stateless
public class ExampleEJB {

    @PersistenceContext(unitName = "examplePU")
    private EntityManager entityManager;

    /*goodsManagerBean*/
    public Goods createGoods(String name, int price) {
        Goods goods = new Goods();
        goods.setName(name);
        goods.setQuantity(price);
        entityManager.persist(goods);
        return goods;
    }

    public List<Goods> getGoods() {
        TypedQuery<Goods> query = entityManager.createQuery("select c from Goods c", Goods.class);
        return query.getResultList();
    }

    /*ordersManagerBean*/
    public Order createOrder() {
        Order order = new Order();
        entityManager.persist(order);
        return order;
    }

    public Goods createGoods(String name, int price) {
        Goods goods = new Goods();
        goods.setQuantity(price);
        goods.setName(name);
        entityManager.persist(goods);
        return goods;
    }

    public boolean addToOrder(long goodsId, long orderId, int quantity) {
        Goods goods = entityManager.find(Goods.class, goodsId);
        if (goods == null) {
            return false;
        }
        Order order = entityManager.find(Order.class, orderId);
        if (order == null) {
            return false;
        }

        GoodsInOrder goodsInOrder = new GoodsInOrder();
        goodsInOrder.setOrder(order);
        goodsInOrder.setGoods(goods);
        goodsInOrder.setQuantity(quantity);
        entityManager.persist(goodsInOrder);
        return true;
    }

    public List<Goods> getGoodsInOrder(long orderId) {
        Order order = entityManager.find(Order.class, orderId);
        if (order == null) {return Collections.emptyList();}
        List<GoodsInOrder> goodsInOrders = order.getGoodsInOrders();
        List<Goods> result = new ArrayList<>();
        for (GoodsInOrder goodsInOrder : goodsInOrders) {
            result.add(goodsInOrder.getGoods());
        }
        return result;
    } /* end of ordersManagerBean*/

    public boolean checkPassword(String login, String password){
        if(StringUtils.isEmpty(login) || StringUtils.isEmpty(password)){
            return false;
        }

        UserEntity userEntity = entityManager.find(UserEntity.class, login);
        if(userEntity == null){
            return false;
        }

        if(password.equals(userEntity.getPassword())){
            return true;
        }

        return false;
    }

    public boolean createUser(String login, String password){
        if(StringUtils.isEmpty(login) || StringUtils.isEmpty(password)){
            return false;
        }

        UserEntity userEntity = entityManager.find(UserEntity.class, login);
        if(userEntity != null){
            return false;
        }

        userEntity = new UserEntity();
        userEntity.setLogin(login);
        userEntity.setPassword(password);
        entityManager.persist(userEntity);

        return true;
    }

    public List<UserEntity> getAllUsers(){
        Query query = entityManager.createQuery("select entity from UserEntity entity");
        return query.getResultList();
    }
}
