/**
 * 提供常用的数学方法
 * @author Liuping
 * @return Object
    MATH
 */
!function () {
    /**************
     * 工具方法定义
     **************/
    // 检测类型
    // 包括：对象<object>，数组<array>，字符串<string>，数值<number>，布尔值<boolean>，函数<function>
    // strKey值为对应尖括号里面的值
    var isWhat = function ( v, strKey ) {
        if ( v != null && (typeof v != 'undefined') && v.constructor ) {
            var reg = new RegExp( strKey, 'ig' );
            var tempStr = v.constructor.toString();
            return reg.test( tempStr );
        }
        return false;
    };

    // 检测是否是数组
    var isArray = function ( arr ) {
        isWhat( arr, 'array' );
    };

    // 合并参数
    var parseParam = function( obj, newObj ){
        var _counter = 0;
        for(var i in newObj){
            _counter++;
        }
        if(!_counter){
            return obj;
        }
        for(var i in newObj){
            if(obj.hasOwnProperty(i)){
                obj[i] = newObj[i];
            }
        }
        return obj;
    };

    /*===基本定义区============*/

    var math = Math;

    // 几次幂
    var pow = Math.pow;

    // 平方
    var square = function ( Num ) {
        return pow( Num, 2 );
    };

    // 立方
    var cube = function ( Num ) {
        return pow( Num, 2 );
    };

    // 平方根
    var sqrt = Math.sqrt;

    // 绝对值
    var abs = Math.abs;

    // 立方根
    var cbrt = function ( Num ) {
        return pow( Num, (1/3) );
    };

    // 计算数组中最小的数
    var min = function ( nums ) {
        if ( isArray( nums ) ) {
            return Math.min.apply( null, nums );
        }
        else {
            return Math.min.apply( null, arguments );
        }
    };

    // 计算数组中最大的数
    var max = function ( nums ) {
        if ( isArray( nums ) ) {
            return Math.max.apply( null, nums );
        }
        else {
            return Math.max.apply( null, arguments );
        }
    };

    /*===平面几何定义区============*/

    // 获取向量AB
    var toVector = function ( A, B ) {
        var vectorAB = {
            'x': B.x - A.x,
            'y': B.y - A.y
        };
        return vectorAB;
    };

    // 笛卡尔<直角>坐标转换成极坐标
    var cartesianToPolar = function ( point ) {
        var result = {
            'rou': sqrt( square( point.x ) + square( point.y ) ),
            'theata': Math.acos( point.x / result.rou )
        };
        return result;
    };

    // 极坐标转换成直角坐标
    var polarToCartesian = function ( point ) {
        return {
            'x': point.rou * Math.cos( point.theata ),
            'y': point.rou * Math.sin( point.theata )
        };
    };

    // 计算两点构成的直线的方程
    var lineParam = function ( P1, P2 ) {
        return {
            'A': P1.y - P2.y,
            'B': P2.x - P1.x,
            'C': P1.x * P2.y - P1.y * P2.x
        };
    };

    /**
     * 已知圆上一点的x<或y>坐标，求对应的y<或x>坐标
     * 圆方程采用标准方程：
     * (x-a)^2 + (y-b)^2 = r^2
     * opt = {a: 1, b: 1, r: 1}
     * @return array
            返回对应的两个点坐标
     */
    var xyOnRound = function ( x, y, opt ) {
        var result = [];
        if ( isWhat( x, 'number' ) ) {
            result.push( { 'x': x, 'y': opt.b + sqrt( square( opt.r ) - square( x - opt.a ) ) } );
            result.push( { 'x': x, 'y': opt.b - sqrt( square( opt.r ) - square( x - opt.a ) ) } );
        }
        else if ( isWhat( y, 'number' ) ) {
            result.push( { 'x': opt.a + sqrt( square( opt.r ) - square( y - opt.b ) ), 'y': y } );
            result.push( { 'x': opt.a - sqrt( square( opt.r ) - square( y - opt.b ) ), 'y': y } );
        }
        return result;
    };

    // 计算两点之间的距离
    var countW = function ( start, end ) {
        return sqrt( square( start.x - end.x ) + square( start.y - end.y ) );
    };

    // 计算点到线的距离，ABC为标准方程 Ax + BY + C = 0，point为点的坐标
    var pointToLineS = function ( A, B, C, Point ) {
        return abs( A * Point.x + B * Point.y + C ) / sqrt( square(A) + square(B) )
    };

    // 检测C点是否在AB点构成的直线上,limitRange可选，表是否为线段
    var isPointOnLine = function ( A, B, C, limitRange ) {
        var linearFlag = !( (A.y - B.y) * C.x + (B.x - A.x) * C.y + A.x * B.y - A.y * B.x );
        // 如果不在直线上或未限制线段则直接返回
        if( !linearFlag || !limitRange ){
            return linearFlag;
        }
        var lineFlag = (C.x >= min( A.x, B.x ) && C.x <= max( A.x, B.x ));
        return lineFlag;
    };

    // 点A围绕点R旋转r角度之后的点B坐标<自Y的正方向向X的正方向旋转>
    var pointRotation = function ( A, R, r ) {
        var AR = countW( A, R );
        if ( AR == 0 ) {
            return A;
        }
        // R到A在X方向上的距离
        var RS = R.x - A.x;
        var AngleARS = Math.acos( RS / AR );
        // T为点B在过R的水平线上的投影
        var AngleBRT = Math.PI - AngleARS - r;
        var B = {
            'x': R.x + Math.cos( AngleBRT ) * AR,
            'y': R.y + Math.sin( AngleBRT ) * AR
        };
        return B;
    };

    // 检测某个点是否在由N个点构成的多边形内部
    // 注意rangePointArr需保持点连线的有序性，即邻接点之间即为一条边
    var isPointInRange = function ( point, rangePointArr ) {
        // 以该点为起点，向某个方向做射线(可定死为指向y轴负方向)，
        // 如果和边的交点个数为奇数则表示在内部，
        // 否则表示在外部
        var px = point.x,
            py = point.y;
        if( rangePointArr.length < 3 ) {
            return false;
        }
        var count = 0;
        for( var i = 0, pL = rangePointArr.length; i < pL; i++ ){
            var startP = rangePointArr[i];
            var endP = rangePointArr[ (i+1) < pL ? (i+1) : 0 ];
            var lineObj = lineParam( startP, endP );
            if( lineObj.B != 0 ) {
                // 获得相交的点
                var cross = { 'x': px, 'y' : -( lineObj.C + lineObj.A * px ) / lineObj.B };
                // 判断点是否在线段上
                var onFlag = isPointOnLine( 
                    startP,
                    endP,
                    point,
                    true 
                );
                // 是否在指定范围
                var rangeFlag = (cross.y <= point.y);
                // 特殊情况，和特殊辅助线垂直的情况
                if( cross.y == startP.y && cross.y == endP.y ) {
                    rangeFlag = rangeFlag && ( cross.x >= min( startP.x, endP.x ) 
                        && cross.x <= max( startP.x, endP.x ) );
                }
                (onFlag || rangeFlag ) && count++;

            }
            else {
                ( !isParallel( startP, endP, point, {x:px, y:py-20 } )
                    || py <= min( startP.y, endP.y ) )
                    && count++;
            }
        }
        console.log(count);
        return !!(count % 2);
    };

    // 检测某点是否在圆内
    // @param 待判断点坐标 圆心坐标 圆的半径
    var isPointInRound = function ( point, root, r ) {
        var PR = countW( point, root );
        return ( PR <= r );
    };

    // 已知点A,B,C，求角ABC，根据余弦定理求，此角度将 大于等于0，小于Math.PI
    var pointToAngle = function ( A, B, C ) {
        var AB = countW( A, B ),
            BC = countW( B, C ),
            AC = countW( A, C );
        var AngleABC = 0;
        // 如果存在点重合的情况，一律认为角度为0
        if ( AB && BC ) {
            AngleABC = Math.acos( ( square( AB ) + square( BC ) - square( AC ) ) / ( 2 * AB * BC ) );
        }
        return AngleABC;
    };

    // 两直线是否平行
    var isParallel = function ( A, B, C, D ) {
        var vectorAB = toVector( A, B );
        var vectorCD = toVector( C, D );
        return ( vectorAB.x * vectorCD.y == vectorAB.y * vectorCD.x );
    };

    // 两直线是否垂直
    var isVertical = function ( A, B, C, D ) {
        var vectorAB = toVector( A, B );
        var vectorCD = toVector( C, D );
        return !( vectorAB.x * vectorCD.x + vectorAB.y * vectorCD.y );
    };

    // 向量AB与向量CD的夹角
    var vectorToAngle = function ( A, B, C, D ) {
        var ABL = countW( A, B ),
            CDL = countW( C, D );
        var vectorAB = toVector( A, B ),
            vectorCD = toVector( C, D );
        var angle = 0;
        if ( ABL && CDL ) {
            var angleVal = ( vectorAB.x * vectorCD.x + vectorAB.y * vectorCD.y ) / ( ABL * CDL );
            // 此处的角度范围为0~PI，符合两向量夹角范围
            angle = Math.acos( angleVal );

        }
        return angle;
    };

    // 圆的面积
    var roundArea = function ( r ) {
        return Math.PI * square( r );
    };

    var mathObj = {
        /** 
         * 原生Math对象
         */
        'math'              : math,
        /**
         * 两点间距离
         * @param Object Object
                两点坐标
         */
        'countW'            : countW,
        /**
         * 平方
         * @param Number
         */
        'square'            : square,
        /**
         * 立方
         * @param Number
         */
        'cube'              : cube,
        /**
         * 平方根
         * @param Number
         */
        'sqrt'              : sqrt,
        /**
         * 立方根
         * @param Number
         */
        'cbrt'              : cbrt,
        /**
         * 绝对值
         */
        'abs'               : abs,
        /**
         * 多少次幂
         */
        'pow'               : pow,
        /**
         * 最小值封装
         * @param Array
                待比较项组成的数组
         */
        'min'               : min,
        /**
         * 最大值封装
         * @param Array
                待比较项组成的数组
         */
        'max'               : max,
        /**
         * 直角坐标转换为极坐标
         * @param Object
                待转换点的坐标
         */
        'cToP'              : cartesianToPolar,
        /**
         * 极坐标转换为直角坐标
         * @param Object
                {'rou': xx, 'theata': xx}
         */
        'pToC'              : polarToCartesian,
        /**
         * 点构成的直线方程
         * @param Object Object
                两点坐标
         * @return Object
                标准直线方程的系数{A: xx, B: xx, C: xx}
         */
        'lineParam'         : lineParam,
        /**
         * 已知某点位于圆上，已知该点的x或y坐标值，得出对应的y或x坐标
         * @param number number Object
                圆方程采用标准形式：
                    (x-a)^2 + (y-b)^2 = r^2
                输入x, y, opt，
                其中，xy已知哪个就写哪个的值，未知的用null或者undefined占位
                其中，opt如下：
                    opt = {a: 1, b: 1, r: 1}
         * @return Array
                返回点对象构成的数组<符合条件的点不止一个>
         */
        'xyOnRound'         : xyOnRound,
        /**
         * 点到直线的距离
         * @param A B C ObjectPoint
                ABC为标准直线方程的系数
         */
        'pointToLineS'      : pointToLineS,
        /**
         * 检测某点是否在某两点构成的直线上
         * @param A B C
                A为待判断点坐标对象，
                BC为构成直线的两点的坐标对象
         */
        'isPointOnLine'     : isPointOnLine,
        /**
         * 点A绕点R自Y的正方向向X的正方向旋转r角度之后的坐标B
         * @param A R r
                AR点坐标，旋转角度r
         * @return B
                返回旋转后的点的坐标
         */
        'pointRotation'     : pointRotation,
        /**
         * 检测某点是否在某个多边形内
         * @param 点P 多边形的有序点数组
         */
        'isPointInRange'    : isPointInRange,
        /**
         * 判断某点是否在圆内
         * @param A R r
                待判断点A，圆心R坐标，半径r
         */
        'isPointInRound'    : isPointInRound,
        /**
         * 三点构成的角的角度
         * @param A B C
                三点的坐标
         * @return number
                角ABC的角度< 弧度制 >
         */
        'pointToAngle'      : pointToAngle,
        /**
         * 圆的面积
         * @param r半径
         */
        'roundArea'         : roundArea,
        /**
         * 判断点构成的直线是否垂直
         * @param A B C D
                AB点构成的直线与CD点构成直线
         */
        'isVertical'        : isVertical,
        /**
         * 判断点构成的直线是否平行
         * @param A B C D
                AB点构成的直线与CD点构成的直线
         */
        'isParallel'        : isParallel,
        /**
         * 两点转换成向量
         * @param A B
                AB两点的坐标
         * @return 向量AB
         */
        'toVector'          : toVector,
        /**
         * 两向量构成的夹角
         * @param A B C D
                向量AB与向量CD构成的夹角
         */
        'vectorToAngle'     : vectorToAngle
    };
    window.$bmath || ( window.$bmath = mathObj );
}();