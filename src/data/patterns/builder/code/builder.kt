import kotlin.math.roundToInt

/**
 * Builder Pattern -- Meal Ordering System (Kotlin)
 *
 * Two approaches:
 *   1. Classic Builder  -- like Java but with apply {} instead of return this
 *   2. DSL Builder      -- lambda with receiver for configuration-block syntax
 */

// ─── Product (shared by both approaches) ────────────────────────────────
data class Meal private constructor(
    val bun: String,
    val pattyCount: Int,
    val cheese: String?,
    val sauce: String?,
    val lettuce: Boolean,
    val tomato: Boolean,
    val bacon: Boolean,
    val size: String,
    val price: Double
) {
    override fun toString(): String {
        return "[MEAL] $bun bun, $pattyCount patties, " +
                "${cheese ?: "no"} cheese, ${sauce ?: "no"} sauce, " +
                "$size -- \$${String.format("%.2f", price)}"
    }

    // ════════════════════════════════════════════════════════════════════
    // APPROACH 1: Classic Builder (with apply {})
    // ════════════════════════════════════════════════════════════════════
    class Builder {
        private var bun: String? = null
        private var pattyCount: Int = 0
        private var cheese: String? = null
        private var sauce: String? = null
        private var lettuce: Boolean = false
        private var tomato: Boolean = false
        private var bacon: Boolean = false
        private var size: String? = null

        // ALL fields via setters -- no constructor params
        // apply {} returns 'this' automatically

        fun bun(bun: String) = apply { this.bun = bun }
        fun pattyCount(count: Int) = apply { this.pattyCount = count }
        fun cheese(cheese: String) = apply { this.cheese = cheese }
        fun sauce(sauce: String) = apply { this.sauce = sauce }
        fun lettuce(lettuce: Boolean) = apply { this.lettuce = lettuce }
        fun tomato(tomato: Boolean) = apply { this.tomato = tomato }
        fun bacon(bacon: Boolean) = apply { this.bacon = bacon }
        fun size(size: String) = apply { this.size = size }

        fun build(): Meal {
            // ── Validation (the GATEKEEPER) ─────────────────────────────
            require(!bun.isNullOrBlank()) { "Bun is required" }
            require(!size.isNullOrBlank()) { "Size is required" }
            require(pattyCount >= 1) { "At least 1 patty is required" }
            require(!(bun.equals("gluten-free", ignoreCase = true) && bacon)) {
                "Gluten-free bun cannot be combined with bacon"
            }

            val computedPrice = computePrice(size!!, pattyCount, cheese, bacon, lettuce, tomato)
            return Meal(bun!!, pattyCount, cheese, sauce, lettuce, tomato, bacon, size!!, computedPrice)
        }
    }

    // ════════════════════════════════════════════════════════════════════
    // APPROACH 2: DSL Builder (lambda with receiver)
    // ════════════════════════════════════════════════════════════════════
    class DslBuilder {
        var bun: String? = null
        var pattyCount: Int = 0
        var cheese: String? = null
        var sauce: String? = null
        var lettuce: Boolean = false
        var tomato: Boolean = false
        var bacon: Boolean = false
        var size: String? = null

        internal fun build(): Meal {
            require(!bun.isNullOrBlank()) { "Bun is required" }
            require(!size.isNullOrBlank()) { "Size is required" }
            require(pattyCount >= 1) { "At least 1 patty is required" }
            require(!(bun.equals("gluten-free", ignoreCase = true) && bacon)) {
                "Gluten-free bun cannot be combined with bacon"
            }

            val computedPrice = computePrice(size!!, pattyCount, cheese, bacon, lettuce, tomato)
            return Meal(bun!!, pattyCount, cheese, sauce, lettuce, tomato, bacon, size!!, computedPrice)
        }
    }

    companion object {
        // DSL entry point: meal { bun = "brioche"; ... }
        fun meal(block: DslBuilder.() -> Unit): Meal {
            val builder = DslBuilder()
            builder.block()
            return builder.build()
        }

        internal fun computePrice(
            size: String, pattyCount: Int, cheese: String?,
            bacon: Boolean, lettuce: Boolean, tomato: Boolean
        ): Double {
            var base = when (size) {
                "small"  -> 3.99
                "medium" -> 5.99
                "large"  -> 7.99
                else     -> 5.99
            }
            base += (pattyCount - 1) * 2.00
            if (cheese != null) base += 0.75
            if (bacon)          base += 1.50
            if (lettuce)        base += 0.25
            if (tomato)         base += 0.25
            return (base * 100.0).roundToInt() / 100.0
        }
    }
}

// ─── Director ───────────────────────────────────────────────────────────
object MealRecipes {

    fun kidsMeal(): Meal = Meal.Builder()
        .bun("sesame")
        .pattyCount(1)
        .cheese("american")
        .sauce("ketchup")
        .lettuce(false)
        .tomato(false)
        .bacon(false)
        .size("small")
        .build()

    fun gourmetBurger(): Meal = Meal.Builder()
        .bun("brioche")
        .pattyCount(2)
        .cheese("gruyere")
        .sauce("truffle aioli")
        .lettuce(true)
        .tomato(true)
        .bacon(true)
        .size("large")
        .build()
}

// ─── Main ───────────────────────────────────────────────────────────────
fun main() {
    println("=== APPROACH 1: Classic Builder ===")

    // Director-built meals
    val kids = MealRecipes.kidsMeal()
    val gourmet = MealRecipes.gourmetBurger()

    // Custom meal via Builder
    val custom = Meal.Builder()
        .bun("whole wheat")
        .pattyCount(3)
        .cheese("pepper jack")
        .sauce("BBQ")
        .lettuce(true)
        .tomato(true)
        .bacon(true)
        .size("medium")
        .build()

    println(kids)
    println(gourmet)
    println(custom)

    println()
    println("=== APPROACH 2: DSL Builder ===")

    // DSL-style meal creation
    val dslKids = Meal.meal {
        bun = "sesame"
        pattyCount = 1
        cheese = "american"
        sauce = "ketchup"
        size = "small"
    }

    val dslGourmet = Meal.meal {
        bun = "brioche"
        pattyCount = 2
        cheese = "gruyere"
        sauce = "truffle aioli"
        lettuce = true
        tomato = true
        bacon = true
        size = "large"
    }

    println(dslKids)
    println(dslGourmet)

    println()
    println("=== Validation Demo ===")

    // Validation failure
    try {
        Meal.Builder()
            .bun("gluten-free")
            .pattyCount(1)
            .bacon(true)
            .size("small")
            .build()
    } catch (e: IllegalArgumentException) {
        println("[ERROR] ${e.message}")
    }
}
