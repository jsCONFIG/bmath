bmath1.0.0
=====
### About
提供常用的数学处理方法，包括相关几何方法。ps:许久前写的，可以按需求择选融入自身的框架中

### API
__1.math__

    原生Math对象，用于自由扩展
    @param 无
    @return Object
    $bmath.math;

__2.countW__

    计算两点的间的距离
    @param Object(两个坐标对象)
    @return Number
    $bmath.countW( { 'x':0,'y':0 }, { 'x':1, 'y':1 } );

__3.square__

    平方
    @param Number
    @return Number
    $bmath.square( 10 );// 100

__4.cube__

    立方
    @param Number
    @return Number
    $bmath.cube( 10 );// 1000

__5.sqrt__

    平方根
    @param Number
    @return Number
    $bmath.sqrt( 100 );// 10

__6.cbrt__

    立方根
    @param Number
    @return Number
    $bmath.cbrt( 1000 );// 10

__7.abs__

    绝对值
    @param Number
    @return Number
    $bmath.abs( -10 );// 10

__8.pow__

    幂
    @param Number 幂次
    @return Number
    $bmath.pow( 10, 2 );// 100

__9.min__

    最小值封装
    @param Array
    @return Number
    $bmath.min( [1,2,4,10] );// 1

__10.max__

    最大值封装
    @param Array
    @return Number
    $bmath.max( [1,2,4,10] );// 10

__11.cToP__

    笛卡尔(直角)坐标转化为极坐标
    @param Object {'x': xx, 'y': xx}
    @return Object {'rou': xx, 'theata': xx}
    $bmath.cToP( {'x':10, 'y':10} );

__12.cToP__

    极坐标转化为笛卡尔(直角)坐标
    @param Object {'rou': xx, 'theata': xx}
    @return Object {'x': xx, 'y': xx}
    $bmath.pToC( {'x':10, 'y':10} );

__13.lineParam__

    点构成的直线方程
    @param Object 两点坐标
    @return Object 标准直线方程的系数{A: xx, B: xx, C: xx}
    $bmath.lineParam( {'x':0, 'y':0}, {'x':10, 'y':10} );

__14.xyOnRound__

    已知某点位于圆上，已知该点的x或y坐标值，得出对应的y或x坐标
    @param Object 两点坐标
    @return Object 标准直线方程的系数{A: xx, B: xx, C: xx}
    $bmath.xyOnRound( {'x':0, 'y':0}, {'x':10, 'y':10} );

__15.pointToLineS__

    点到直线的距离
    @param A B C ObjectPoint, ABC为标准直线方程的系数
    @return Number
    $bmath.pointToLineS( A, B, C, {'x':10,'y':10} );

__16.isPointOnLine__

    检测某点是否在某两点构成的直线上
    @param A B C ,A为待判断点坐标对象，BC为构成直线的两点的坐标对象
    @return Boolean
    $bmath.isPointOnLine( A, B, C );

__17.pointRotation__

    点A绕点R自Y的正方向向X的正方向旋转r角度之后的坐标B
    @param A R r,AR点坐标，旋转角度r
    @return Object,返回旋转后的点的坐标
    $bmath.pointRotation( A, R, Math.PI );

__18.isPointInRound__

    判断某点是否在圆内
    @param A R r,待判断点A，圆心R坐标，半径r
    @return Boolean
    $bmath.isPointInRound( A, R, 10 );

__19.pointToAngle__

    三点构成的角的角度
    @param A B C,三点的坐标
    @return Number,角ABC的角度(弧度制)
    $bmath.pointToAngle( A, B, C );

__20.roundArea__

    圆的面积
    @param r半径
    @return Number
    $bmath.roundArea( 10 );

__21.isVertical__

    判断点构成的直线是否垂直
    @param A B C D,AB点构成的直线与CD点构成直线
    @return Boolean
    $bmath.isVertical( A, B, C, D );

__22.isParallel__

    判断点构成的直线是否平行
    @param A B C D,AB点构成的直线与CD点构成直线
    @return Boolean
    $bmath.isParallel( A, B, C, D );

__23.toVector__

    两点转换成向量
    @param A B,AB两点的坐标
    @return Object,向量AB
    $bmath.toVector( A, B );

__24.vectorToAngle__

    两向量构成的夹角
    @param A B C D,向量AB与向量CD构成的夹角
    @return Number
    $bmath.vectorToAngle( A, B, C, D );
