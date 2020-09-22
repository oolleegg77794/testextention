<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDomainListTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('domain_list', function (Blueprint $table) {
            $table->id();

            $table->string('domain');
            $table->unique('domain');
            $table->boolean('thematic')->nullable();
            $table->integer('status')->nullable();
            $table->integer('type')->nullable();
            $table->integer('price')->nullable();
            $table->integer('url_status')->nullable();
            $table->boolean('url_thematic')->nullable();
            $table->string('link')->nullable();
            $table->integer('link_type')->nullable();
            $table->integer('referring_domains')->nullable();
            $table->integer('url_rating')->nullable();
            $table->integer('organic_search_traffic')->nullable();
            $table->integer('external_links')->nullable();
            $table->integer('internal_links')->nullable();
            $table->integer('trust_flow')->nullable();
            $table->integer('citation_flow')->nullable();
            $table->integer('link_position')->nullable();
            $table->integer('is_https_referral')->nullable();
            $table->integer('country')->nullable();
            $table->integer('tech_status')->nullable();
            $table->text('auth')->nullable();
            $table->string('auth_link')->nullable();
            $table->text('comment')->nullable();
            $table->integer('manager_id')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('extensions');
    }
}
