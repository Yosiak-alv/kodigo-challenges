<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
/**
 * @OA\Tag(name="QueryBuilder", description="API for query builder challenges")
 */
class QueryBuilderController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/challenge1",
     *     tags={"QueryBuilder"},
     *     summary="Insert five new users",
     *     @OA\Response(
     *         response=200,
     *         description="Five users inserted successfully"
     *     )
     * )
     */
    public function challenge1()
    {
        // Define users and orders data
        $users = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'phone' => '1234537890',
                'orders' => [
                    ['product_name' => 'Laptop', 'quantity' => 2, 'total' => 2000.00],
                ],
            ],
            [
                'name' => 'Jane Doe',
                'email' => 'jane@example.com',
                'phone' => '0987114321',
                'orders' => [
                    ['product_name' => 'Mobile Phone', 'quantity' => 1, 'total' => 500.00],
                    ['product_name' => 'Bike', 'quantity' => 4, 'total' => 1500.00],
                ],
            ],
            [
                'name' => 'James Smith',
                'email' => 'james@example.com',
                'phone' => '1234567890',
                'orders' => [
                    ['product_name' => 'Tablet', 'quantity' => 3, 'total' => 750.00],
                ],
            ],
            [
                'name' => 'Mary Johnson',
                'email' => 'mary@example.com',
                'phone' => '0987654321',
                'orders' => [
                    ['product_name' => 'Smart Watch', 'quantity' => 1, 'total' => 200.00],
                ],
            ],
            [
                'name' => 'Robert Brown',
                'email' => 'robert@example.com',
                'phone' => '1211567890',
                'orders' => [
                    ['product_name' => 'Headphones', 'quantity' => 1, 'total' => 50.00],
                ],
            ],
        ];

        try {
            foreach ($users as $userData) {
                // Create the user
                $user = User::create([
                    'name' => $userData['name'],
                    'email' => $userData['email'],
                    'phone' => $userData['phone'],
                ]);

                // Create associated orders
                if (isset($userData['orders'])) {
                    foreach ($userData['orders'] as $order) {
                        $user->orders()->create($order);
                    }
                }
            }

            return response()->json(['message' => 'Five users and orders inserted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error occurred while inserting data', 'error' => $e->getMessage()], 500);
        }
    }
    /**
     * @OA\Get(
     *     path="/api/challenge2",
     *     tags={"QueryBuilder"},
     *     summary="Get orders for user 2",
     *     @OA\Response(
     *         response=200,
     *         description="Orders for user 2"
     *     )
     * )
     */
    public function challenge2()
    {
        // orders for user 2
        $orders = Order::select('product_name', 'quantity', 'total')->where('user_id', 2)->get();
        return response()->json($orders);
    }

    /**
     * @OA\Get(
     *     path="/api/challenge3",
     *     tags={"QueryBuilder"},
     *     summary="Get orders with user details",
     *     @OA\Response(
     *         response=200,
     *         description="Orders with user details"
     *     )
     * )
     */
    public function challenge3()
    {
        // orders with user details
        $orders = Order::with(['user:id,name,email'])->get();
        return response()->json($orders);
    }

    /**
     * @OA\Get(
     *     path="/api/challenge4",
     *     tags={"QueryBuilder"},
     *     summary="Get orders where total is on [100, 250]",
     *     @OA\Response(
     *         response=200,
     *         description="Orders where total is on [100, 250]"
     *     )
     * )
     */
    public function challenge4()
    {
        // orders where total is on [100, 250]
        $orders = Order::select('product_name', 'quantity', 'total')->whereBetween('total', [100, 250])->get();
        return response()->json($orders);
    }

    /**
     * @OA\Get(
     *     path="/api/challenge5",
     *     tags={"QueryBuilder"},
     *     summary="Get users where name starts with 'R'",
     *     @OA\Response(
     *         response=200,
     *         description="Users where name starts with 'R'"
     *     )
     * )
     */
    public function challenge5()
    {
        // users where name starts with 'R'
        $users = DB::table('users')->select('name', 'email', 'phone')->where('name', 'like', 'R%')->get();
        return response()->json($users);
    }


    /**
     * @OA\Get(
     *     path="/api/challenge6",
     *     tags={"QueryBuilder"},
     *     summary="Get total orders for user 5",
     *     @OA\Response(
     *         response=200,
     *         description="Total orders for user 5"
     *     )
     * )
     */
    public function challenge6()
    {
        // calculate total orders for user 5
        $totalOrders = Order::where('user_id', 5)->sum('total');
        return response()->json(['total' => $totalOrders]);
    }

    /**
     * @OA\Get(
     *     path="/api/challenge7",
     *     tags={"QueryBuilder"},
     *     summary="Get orders with user details sorted by total in descending order",
     *     @OA\Response(
     *         response=200,
     *         description="Orders with user details sorted by total in descending order"
     *     )
     * )
     */
    public function challenge7()
    {
        // orders with user details sorted by total in descending order
        $orders = DB::table('orders')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->select('orders.*', 'users.name', 'users.email')
            ->orderBy('orders.total', 'desc')
            ->get();
        return response()->json($orders);
    }

    /**
     * @OA\Get(
     *     path="/api/challenge8",
     *     tags={"QueryBuilder"},
     *     summary="Get sum of total of all orders",
     *     @OA\Response(
     *         response=200,
     *         description="Sum of total of all orders"
     *     )
     * )
     */
    public function challenge8()
    {
        //sum of total of all orders
        $total = Order::sum('total');
        return response()->json(['total' => $total]);
    }

    /**
     * @OA\Get(
     *     path="/api/challenge9",
     *     tags={"QueryBuilder"},
     *     summary="Get smallest total order with user details",
     *     @OA\Response(
     *         response=200,
     *         description="Smallest total order with user details"
     *     )
     * )
     */
    public function challenge9()
    {
        // find smallest total order with user details
        $order = Order::with('user')->orderBy('total')->first();
        return response()->json($order);
    }

    /**
     * @OA\Get(
     *     path="/api/challenge10",
     *     tags={"QueryBuilder"},
     *     summary="Get orders with user details grouped by user name",
     *     @OA\Response(
     *         response=200,
     *         description="Orders with user details grouped by user name"
     *     )
     * )
     */
    public function challenge10()
    {
        $users = User::with('orders:id,product_name,quantity,total,user_id')->get();

        return response()->json($users);
    }
}
