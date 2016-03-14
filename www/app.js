// This is a JavaScript file

//参考サイト：　　http://blog.asial.co.jp/1197?category_id=14

//
//Example 1: Hello World
//
//スコープ($scope)はアプリケーションのモデル (Model) を保持します。
//もちろん文字列や数値など以外に関数やオブジェクトも入れておくことができます。
//コントローラー (Controller) はその関数固有の$scopeを持っています。

//firstCtrlというコントローラーの定義です。
//モデル (Model) として内部に$scope.hello = "Hello Angular!"を包含しています。

function firstCtrl($scope){
  $scope.hello = "Hello Angular!";
};
 
function secondCtrl($scope){
  $scope.hello = "Hello Monaca!";
};
 
function thirdCtrl($scope){
  $scope.hello = "Hello World!";
};

//MonaCtrlコントローラーを定義
function MonaCtrl($scope){
  $scope.name = "Monaca!!!";
  
  $scope.getMonaca = function(){
    return $scope.name;
  }
}

//
//Example 3:ちょっと項目数を増やした例
//
//入力フォームの例です。
// 黒あん最中は50個まで、白あん最中は20個まで、粒あん最中は15個まで購入できます。
// 5000円以上買うと、送料500円が無料になります。
function MonaCtrl($scope){
  
  
  //MonaCtrlというコントローラーを定義していて、
  //値の初期化のためにここで、$scope.item1などに値を代入しています。
  //$scopeの中にはもちろん、オブジェクトも入れることができます。

  //各Modelの値を初期化する
  $scope.item1 = 0;
  $scope.item2 = 0;
  $scope.item3 = 0;
  $scope.shippingMessage = "";
  $scope.shipping = 0;
  
  $scope.items = {
    item1 : {
      name : "黒あん最中",  //ng-model="item1" 
      price : 100
    },
    item2 : {
      name : "白あん最中",  //ng-model="item2" 
      price : 120
    },
    item3 : {
      name : "粒あん最中",  //ng-model="item3" 
      price : 90
    }
  };
  
  //それぞれ商品の商品の購入量や商品の合計代金を計算する関数を定義しています。
  //またgetPayment()は合計代金に送料を足した総代金を計算する関数です。
  //ユーザーが入力フォームにそれぞれ入力した合計がその都度、計算されて、
  //index.htmlの{{getAmount()}}などのExpressions中に表示されます。  
  $scope.getAmount = function(){
    return  $scope.item1 + $scope.item2 + $scope.item3;
  }
    
  $scope.getPayment = function(){    
    return  $scope.item1 * $scope.items.item1.price + $scope.item2 * $scope.items.item2.price + $scope.item3 * $scope.items.item3.price; 
  } 
 
  $scope.getTotalcost = function(){    
    return  $scope.getPayment() + $scope.shipping;
  } 
  
  //$watch関数は AngularJSのScopeオブジェクトが提供する関数です。
  //値の監視を行うことができます。監視したいデータを第1引数にとります。
  //ここではgetPayment()の値を監視しています。
  //そして、第２引数にリスナーを関数として指定します。
  //第２引数中の関数の引数である、newValueとoldValueですが、監視対象のデータに変更があるたび、$watchがそれを検出して、
  //新しい値がnewValueに、元の値がoldValue中に格納される挙動になります。
  //$watch関数でgetPayment()の値を監視する。監視結果に応じて$scope.shippingMessage、$scope.shipping、すなわち送料メッセージと送料の値を変更。
  $scope.$watch("getPayment()", function(newValue, oldValue){
      
    //ここではgetPayment()に変更があるたびに上記の条件分岐ロジックが走ります。
    //$Payment()、すなわち商品代金が5000よりも少なければ、送料は500円。
    //5000円以上であれば、送料は0円、無料になります。
    //ここで変更されている$scope.shippingはindex.htmlの{{shipping}}に結びついています。
    if($scope.getPayment() < 5000){
      $scope.shippingMessage = "送料";   
      $scope.shipping = 500; 
    }else if($scope.getPayment() >= 5000){
      $scope.shippingMessage = "送料無料!";     
      $scope.shipping = 0;
    }
  });
}