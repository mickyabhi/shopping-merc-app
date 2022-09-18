import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { scaledValue } from "../../utils/design.utils";
import SearchBar from "../../components/SearchBar";
import EditItemModal from "./Components/EditItemModal";
import ItemCard from "../../components/ItemsCard";
import TopHeader from "../../components/TopHeader";
import backIcon from "../../../assets/images/back.png";
import searchIcon from "../../../assets/images/search_icon.png";
import dummy_product from "../../../assets/images/dummy_product.png";
import { fetchAllStoreProducts, fetchSubCategory } from "../AppStore/actions";
import { useDispatch, useSelector } from "react-redux";
import { trackAnalytics } from "../../utils/analytics.utils";
import { styles } from "./styles";

const ManageInventory = (props) => {
  const dispatch = useDispatch();
  const [storeInventoryProducts, setStoreInventoryProducts] = useState([]);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [searchProducts, setSearchProducts] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const products = useSelector<any>((state) => state?.products);
  const storeProducts = useSelector<any>((state) => state?.storeProducts);
  const storeName = useSelector<any>((state) => state?.store?.name);
  const storeCategory = useSelector<any>((state) => state?.store?.category);

  useEffect(() => {
    let storeProductsMap = null;

    if (storeProducts != null) {
      storeProductsMap = {};
      storeProducts.forEach((storeProduct) => {
        storeProductsMap[storeProduct.productId] = storeProduct;
      });
    }

    if (storeProductsMap && products) {
      const inventoryProducts = products.map((product) => {
        product.storeInventory = storeProductsMap[product.id];
        return product;
      });

      setStoreInventoryProducts(inventoryProducts);
    }
  }, [storeProducts, products]);

  const onCategorySelected = (category) => {
    dispatch(fetchAllStoreProducts(category));
  };

  const onInventoryUpdated = () => {
    setSelectedProductForEdit(null);
    dispatch(fetchAllStoreProducts(null));
  };

  useEffect(() => {
    dispatch(fetchSubCategory(storeCategory));
  }, [storeCategory]);

  const filterProducts = () => {
    if (searchProducts == "") {
      return storeInventoryProducts;
    } else {
      return storeInventoryProducts.filter((product) =>
        product.description.toLowerCase().includes(searchProducts.toLowerCase())
      );
    }
  };

  return (
    <View style={styles.manageInventoryView}>
      <View>
        <TopHeader
          headerScreen="ManageInventory"
          storeName={storeName}
          headerContentText="Please select the category & edit availability , price"
          onPress={() => {
            trackAnalytics().trackEvents("ManageInventory", {
              CTA: "BackIcon",
            });
            props.navigation.goBack();
          }}
          iconSize={scaledValue(34)}
          headerIcon={backIcon}
          onCategorySelected={onCategorySelected}
        />
      </View>
      <View style={styles.manageInventoryMainView}>
        <View style={styles.searchBarView}>
          <SearchBar
            color="#F8993A"
            size={scaledValue(35)}
            icon={searchIcon}
            placeholder="Search for Products, items to add"
            onChangeText={(text) => setSearchProducts(text)}
          />
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          data={filterProducts()}
          renderItem={({ item }) => (
            <ItemCard
              key={item.id}
              editButtonEventHandler={() => {
                trackAnalytics().trackEvents("ManageInventory", {
                  CTA: "editSelectedProduct",
                  EnabledInventory: item.description,
                });
                setModalVisibility(true);
                setSelectedProductForEdit(item);
              }}
              itemImage={dummy_product}
              itemName={item.description}
              setSelectedProductForEdit={() => setSelectedProductForEdit(item)}
              product={item}
              mrp={item.mrp}
              setModalVisibility={setModalVisibility}
            />
          )}
        />
      </View>
      {selectedProductForEdit && (
        <EditItemModal
          visible={modalVisibility}
          hideModal={() => {
            dispatch(fetchAllStoreProducts(null));
            setModalVisibility(false);
          }}
          onInventoryUpdated={onInventoryUpdated}
          productData={selectedProductForEdit}
        />
      )}
    </View>
  );
};

export default ManageInventory;
